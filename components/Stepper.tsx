import React from 'react';

interface StepperProps {
    currentStep: number;
    steps: string[];
    onStepClick: (stepIndex: number) => void;
    completedSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps, onStepClick, completedSteps }) => {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center flex-wrap">
                {steps.map((step, stepIdx) => (
                    <li key={step} className={`relative mb-2 ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-12' : ''}`}>
                        {stepIdx < completedSteps ? ( // Completed step
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-brand-primary-light dark:bg-brand-primary-dark" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onStepClick(stepIdx)}
                                    className="relative w-8 h-8 flex items-center justify-center bg-brand-primary-light dark:bg-brand-primary-dark rounded-full hover:bg-brand-secondary-light dark:hover:bg-brand-secondary-dark transition-colors"
                                    aria-label={`Go to step ${stepIdx + 1}: ${step}`}
                                >
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                                    </svg>
                                    <span className="absolute top-10 text-xs text-center w-24 text-content-200-light dark:text-content-200-dark">{step}</span>
                                </button>
                            </>
                        ) : stepIdx === currentStep ? ( // Current step
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-base-300-light dark:bg-base-300-dark" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onStepClick(stepIdx)}
                                    className="relative w-8 h-8 flex items-center justify-center bg-base-200-light dark:bg-base-200-dark border-2 border-brand-primary-light dark:border-brand-primary-dark rounded-full"
                                    aria-current="step"
                                >
                                    <span className="h-2.5 w-2.5 bg-brand-primary-light dark:bg-brand-primary-dark rounded-full" aria-hidden="true" />
                                     <span className="absolute top-10 text-xs text-center w-24 font-bold text-brand-primary-light dark:text-brand-primary-dark">{step}</span>
                                </button>
                            </>
                        ) : ( // Future step
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-base-300-light dark:bg-base-300-dark" />
                                </div>
                                <div
                                    className="group relative w-8 h-8 flex items-center justify-center bg-base-200-light dark:bg-base-200-dark border-2 border-base-300-light dark:border-base-300-dark rounded-full"
                                >
                                    <span className="h-2.5 w-2.5 bg-transparent rounded-full" aria-hidden="true" />
                                     <span className="absolute top-10 text-xs text-center w-24 text-content-200-light dark:text-content-200-dark">{step}</span>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Stepper;