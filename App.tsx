import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Stepper from './components/Stepper';
import QuestionCard from './components/QuestionCard';
import WizardNavigation from './components/WizardNavigation';
import SummaryView from './components/SummaryView';
import PromptDisplay from './components/PromptDisplay';
import Templates from './components/Templates';
import { QUESTIONS, QUESTION_GROUPS } from './utils/questions';
import { Answers, AdvancedConfig } from './types';
import { generateTechnicalPrompt } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';

type AppState = 'templates' | 'wizard' | 'summary' | 'result';

const App: React.FC = () => {
    const [appState, setAppState] = useLocalStorage<AppState>('appState', 'templates');
    const [answers, setAnswers] = useLocalStorage<Answers>('answers', {});
    const [currentStep, setCurrentStep] = useLocalStorage<number>('currentStep', 0); // This is the group index
    const [prompt, setPrompt] = useLocalStorage<string>('prompt', '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [config, setConfig] = useLocalStorage<AdvancedConfig>('advancedConfig', {
        apiKey: '', // Restored for user input
        model: 'gemini-2.5-flash',
        temperature: 0.7,
        topP: 1,
        topK: 40,
    });

    const totalSteps = QUESTION_GROUPS.length;

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
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
    
    const handleGeneratePrompt = async () => {
        if (!config.apiKey) {
            setError('Vui lòng nhập API Key của bạn để tiếp tục.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const generatedPrompt = await generateTechnicalPrompt(answers, config);
            setPrompt(generatedPrompt);
            setAppState('result');
        } catch (err: any) {
            setError(err.message || 'Đã có lỗi không mong muốn xảy ra.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        setAppState('templates');
        setAnswers({});
        setCurrentStep(0);
        setPrompt('');
        setError(null);
    };

    const startFromScratch = () => {
        setAnswers({});
        setCurrentStep(0);
        setPrompt('');
        setError(null);
        setAppState('wizard');
    };

    const selectTemplate = (templateAnswers: Answers) => {
        setAnswers(templateAnswers);
        setCurrentStep(0);
        setPrompt('');
        setError(null);
        setAppState('wizard');
    };
    
    const handleBackToWizard = () => {
        if (currentStep >= totalSteps) {
            setCurrentStep(totalSteps - 1);
        }
        setAppState('wizard');
    }

    const renderContent = () => {
        switch (appState) {
            case 'templates':
                return <Templates onSelectTemplate={selectTemplate} onStartFromScratch={startFromScratch} />;
            case 'wizard':
                const currentGroup = QUESTION_GROUPS[currentStep];
                if (!currentGroup) {
                    setCurrentStep(0);
                    return null;
                }
                const questionsInGroup = QUESTIONS.slice(currentGroup.from, currentGroup.to);
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
                                />
                            ))}
                        </div>
                        <WizardNavigation
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            isNextDisabled={false}
                        />
                    </>
                );
            case 'summary':
                return (
                    <SummaryView
                        answers={answers}
                        onGenerate={handleGeneratePrompt}
                        isLoading={isLoading}
                        config={config}
                        onConfigChange={setConfig}
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
            <Header onNewProject={resetState} />
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
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

export default App;
