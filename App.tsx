import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Stepper from './components/Stepper';
import QuestionCard from './components/QuestionCard';
import WizardNavigation from './components/WizardNavigation';
import SummaryView from './components/SummaryView';
import PromptDisplay from './components/PromptDisplay';
import Templates from './components/Templates';
import SettingsModal from './components/SettingsModal';
import { QUESTIONS, QUESTION_GROUPS } from './utils/questions';
import { Answers, AdvancedConfig, Project } from './types';
import { generateTechnicalPrompt, generateSuggestionsForQuestionGroup } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';

type AppState = 'dashboard' | 'wizard' | 'summary' | 'result';

const App: React.FC = () => {
    const [appState, setAppState] = useLocalStorage<AppState>('appState', 'dashboard');
    const [answers, setAnswers] = useLocalStorage<Answers>('answers', {});
    const [currentStep, setCurrentStep] = useLocalStorage<number>('currentStep', 0);
    const [prompt, setPrompt] = useLocalStorage<string>('prompt', '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false); // Track unsaved changes
    
    // AI Suggestion State
    const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
    const [aiSuggestedFields, setAiSuggestedFields] = useLocalStorage<Set<string>>('aiSuggestedFields', new Set());


    const [config, setConfig] = useLocalStorage<AdvancedConfig>('advancedConfig', {
        apiKey: '',
        model: 'gemini-2.5-flash',
        temperature: 0.7,
        topP: 1,
        topK: 40,
    });
    
    const [projects, setProjects] = useLocalStorage<Project[]>('savedProjects', []);
    const [activeProjectId, setActiveProjectId] = useLocalStorage<string | null>('activeProjectId', null);
    const [projectName, setProjectName] = useLocalStorage<string>('projectName', 'Dự án không tên');

    // Settings Modal State
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

    const totalSteps = QUESTION_GROUPS.length;
    
    useEffect(() => {
        if (activeProjectId && !projects.find(p => p.id === activeProjectId)) {
            setActiveProjectId(null);
        }
    }, [activeProjectId, projects, setActiveProjectId]);

    // Effect to run a pending action once an API key is available
    useEffect(() => {
        if (pendingAction && config.apiKey) {
            pendingAction();
            setPendingAction(null);
        }
    }, [config.apiKey, pendingAction]);

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        setIsDirty(true);
        // If user edits a field, it's no longer purely AI suggested
        const newSuggestedFields = new Set(aiSuggestedFields);
        newSuggestedFields.delete(questionId);
        setAiSuggestedFields(newSuggestedFields);
    };

    const handleProjectNameChange = (name: string) => {
        setProjectName(name);
        setIsDirty(true);
    };

    const handleConfigChange = (newConfig: AdvancedConfig) => {
        setConfig(newConfig);
        // If the user is saving a new API key, we should consider this a "savable" change
        // to the project settings.
        setIsDirty(true);
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setAppState('summary');
        }
    };
    
    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStepClick = (stepIndex: number) => {
       setCurrentStep(stepIndex);
    };
    
    const executeActionWithApiKey = (action: (apiKey: string) => Promise<void>) => {
        const execute = async () => {
             // Use the most current API key from the state
            const currentApiKey = config.apiKey;
            if (currentApiKey) {
                await action(currentApiKey);
            }
        };

        if (!config.apiKey) {
            setPendingAction(() => execute);
            setIsSettingsModalOpen(true);
        } else {
            execute();
        }
    };

    const handleGeneratePrompt = async () => {
        executeActionWithApiKey(async (apiKey) => {
            setIsLoading(true);
            setError(null);
            try {
                const currentConfig = { ...config, apiKey };
                const generatedPrompt = await generateTechnicalPrompt(answers, currentConfig);
                setPrompt(generatedPrompt);
                setAppState('result');
                setIsDirty(true);
            } catch (err: any) {
                setError(err.message || 'Đã có lỗi không mong muốn xảy ra.');
            } finally {
                setIsLoading(false);
            }
        });
    };

    const handleGenerateSuggestions = async () => {
        executeActionWithApiKey(async (apiKey) => {
            setIsGeneratingSuggestions(true);
            setError(null);
            try {
                const initialAnswers = {
                    purpose: answers.purpose || '',
                    targetAudience: answers.targetAudience || '',
                    mainFeatures: answers.mainFeatures || '',
                };
                const currentConfig = { ...config, apiKey };
                
                const remainingGroups = QUESTION_GROUPS.slice(1);
                
                const suggestionPromises = remainingGroups.map(group => {
                    const questionsInGroup = QUESTIONS.slice(group.from, group.to);
                    return generateSuggestionsForQuestionGroup(initialAnswers, questionsInGroup, currentConfig)
                        .then(suggestions => {
                            // Update UI incrementally as each promise resolves
                            setAnswers(prev => ({ ...prev, ...suggestions }));
                            setAiSuggestedFields(prevSet => {
                                const newSet = new Set(prevSet);
                                Object.keys(suggestions).forEach(key => newSet.add(key));
                                return newSet;
                            });
                        });
                });

                await Promise.all(suggestionPromises);

                setIsDirty(true); // New content has been added
            } catch (err: any) {
                setError(err.message || 'Không thể tạo một vài gợi ý. Vui lòng thử lại.');
            } finally {
                setIsGeneratingSuggestions(false);
            }
        });
    };

    const startNewProjectSession = () => {
        setAnswers({});
        setCurrentStep(0);
        setPrompt('');
        setError(null);
        setProjectName('Dự án không tên');
        setActiveProjectId(null);
        setIsDirty(false);
        setAiSuggestedFields(new Set());
    };

    const confirmAndExecute = (action: () => void) => {
        if (isDirty) {
            if (window.confirm('Bạn có những thay đổi chưa được lưu. Bạn có chắc chắn muốn tiếp tục và mất các thay đổi không?')) {
                action();
            }
        } else {
            action();
        }
    };

    const resetState = () => {
        confirmAndExecute(() => {
            startNewProjectSession();
            setAppState('dashboard');
        });
    };

    const startFromScratch = () => {
        startNewProjectSession();
        setAppState('wizard');
    };

    const selectTemplate = (templateAnswers: Answers) => {
        startNewProjectSession();
        setAnswers(templateAnswers);
        setAppState('wizard');
    };
    
    const handleBackToWizard = () => {
        if (currentStep >= totalSteps) {
            setCurrentStep(totalSteps - 1);
        }
        setAppState('wizard');
    }
    
    const handleSaveProject = () => {
        const currentState = { appState, answers, currentStep, prompt, config, aiSuggestedFields: Array.from(aiSuggestedFields) };
        if (currentState.appState === 'dashboard') return;

        if (activeProjectId) {
            setProjects(prev => prev.map(p => 
                p.id === activeProjectId 
                    ? { ...p, name: projectName, lastSaved: new Date().toISOString(), state: currentState as any }
                    // @ts-ignore TODO: Fix this type error
                    : p
            ));
        } else {
            const newId = Date.now().toString();
            const newProject: Project = {
                id: newId,
                name: projectName,
                lastSaved: new Date().toISOString(),
                state: currentState as any
            };
            setProjects(prev => [...prev, newProject]);
            setActiveProjectId(newId);
        }
        setIsDirty(false);
    };

    const handleLoadProject = (projectId: string) => {
        confirmAndExecute(() => {
            const projectToLoad = projects.find(p => p.id === projectId);
            if (projectToLoad) {
                const { state } = projectToLoad;
                setAnswers(state.answers);
                setCurrentStep(state.currentStep);
                setPrompt(state.prompt);
                setConfig(state.config);
                setProjectName(projectToLoad.name);
                setActiveProjectId(projectToLoad.id);
                setAppState(state.appState);
                setIsDirty(false);
                // Handle loading of aiSuggestedFields, converting array back to Set
                // @ts-ignore TODO: Fix this type error
                setAiSuggestedFields(new Set((state as any).aiSuggestedFields || []));
            }
        });
    };

    const handleDeleteProject = (projectId: string) => {
        const doDelete = () => {
            setProjects(prev => prev.filter(p => p.id !== projectId));
            if (activeProjectId === projectId) {
                startNewProjectSession();
                setAppState('dashboard');
            }
        };

        const confirmDelete = () => {
            if (window.confirm('Bạn có chắc muốn xóa dự án này không? Hành động này không thể hoàn tác.')) {
                doDelete();
            }
        };

        if (projectId === activeProjectId && isDirty) {
            if (window.confirm('Dự án này có thay đổi chưa lưu. Xóa dự án sẽ làm mất các thay đổi này. Bạn có chắc muốn xóa vĩnh viễn không?')) {
                doDelete();
            }
        } else {
            confirmDelete();
        }
    };

    const renderContent = () => {
        switch (appState) {
            case 'dashboard':
                return <Templates 
                    onSelectTemplate={selectTemplate} 
                    onStartFromScratch={startFromScratch}
                    projects={projects}
                    onLoadProject={handleLoadProject}
                    onDeleteProject={handleDeleteProject}
                />;
            case 'wizard':
                const currentGroup = QUESTION_GROUPS[currentStep];
                if (!currentGroup) {
                    setCurrentStep(0);
                    return null;
                }
                const questionsInGroup = QUESTIONS.slice(currentGroup.from, currentGroup.to);
                const isFirstStepAnswered = !!(answers.purpose && answers.targetAudience && answers.mainFeatures);
                return (
                    <>
                        <div className="mb-8">
                            <Stepper
                                currentStep={currentStep}
                                steps={QUESTION_GROUPS.map(g => g.title)}
                                onStepClick={handleStepClick}
                                completedSteps={currentStep}
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-content-100-light dark:text-content-100-dark mb-6 text-center">{currentGroup.title}</h2>
                        <div className="space-y-6">
                            {questionsInGroup.map((q) => (
                                <QuestionCard
                                    key={q.id}
                                    question={q}
                                    value={answers[q.id] || ''}
                                    onChange={(value) => handleAnswerChange(q.id, value)}
                                    isAiSuggested={aiSuggestedFields.has(q.id)}
                                />
                            ))}
                        </div>
                        <WizardNavigation
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            isNextDisabled={isGeneratingSuggestions}
                            onGenerateSuggestions={handleGenerateSuggestions}
                            isGeneratingSuggestions={isGeneratingSuggestions}
                            isFirstStepAnswered={isFirstStepAnswered}
                        />
                    </>
                );
            case 'summary':
                return (
                    <SummaryView
                        answers={answers}
                        onGenerate={handleGeneratePrompt}
                        isLoading={isLoading}
                        onBack={handleBackToWizard}
                    />
                );
            case 'result':
                return <PromptDisplay prompt={prompt} onEdit={handleBackToWizard} onStartNew={resetState} />;
            default:
                return <div>Trạng thái không hợp lệ</div>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-100-light dark:bg-base-100-dark text-content-100-light dark:text-content-100-dark font-sans">
            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                onSave={handleConfigChange}
                currentConfig={config}
            />
            <Header 
                onNewProject={resetState} 
                onSaveProject={handleSaveProject} 
                isProjectActive={appState !== 'dashboard'} 
                isSaveEnabled={isDirty}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
            />
            <main className="flex-grow container mx-auto p-4 sm:p-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-fade-in" role="alert">
                        <strong className="font-bold">Lỗi!</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>
                )}
                {appState !== 'dashboard' && (
                    <div className="mb-6">
                        <label htmlFor="projectName" className="sr-only">Tên dự án</label>
                        <input 
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => handleProjectNameChange(e.target.value)}
                            className="text-2xl sm:text-3xl font-bold bg-transparent border-b-2 border-transparent focus:border-brand-primary-light dark:focus:border-brand-primary-dark outline-none transition-colors w-full max-w-xl p-1 -ml-1"
                            placeholder="Dự án không tên"
                        />
                    </div>
                )}
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

export default App;