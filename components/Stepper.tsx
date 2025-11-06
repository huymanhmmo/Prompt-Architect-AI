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
            <ol role="list" className="flex flex-wrap justify-center">
                {steps.map((step, stepIdx) => (
                    <li key={step} className={`relative mb-12 ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-12' : ''}`}>
                        {/* Connector line logic */}
                        {stepIdx !== steps.length - 1 && (
                            <>
                                {/* Default gray line */}
                                <div className="absolute inset-0 left-4 top-4 h-0.5 w-full bg-base-300-light dark:bg-base-300-dark" aria-hidden="true" />
                                {/* Colored line for completed steps */}
                                {stepIdx < completedSteps && (
                                    <div className="absolute inset-0 left-4 top-4 h-0.5 w-full bg-brand-primary-light dark:bg-brand-primary-dark" aria-hidden="true" />
                                )}
                            </>
                        )}
                        
                        <button
                            type="button"
                            onClick={() => onStepClick(stepIdx)}
                            className="relative flex flex-col items-center w-20 sm:w-24 focus:outline-none"
                            aria-label={`Go to step ${stepIdx + 1}: ${step}`}
                        >
                            {/* Circle for completed step */}
                            {stepIdx < completedSteps ? (
                                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary-light dark:bg-brand-primary-dark hover:bg-brand-secondary-light dark:hover:bg-brand-secondary-dark transition-colors">
                                    <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            ) : stepIdx === currentStep ? (
                                // Circle for current step
                                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-primary-light dark:border-brand-primary-dark bg-base-200-light dark:bg-base-200-dark">
                                    <span className="h-2.5 w-2.5 rounded-full bg-brand-primary-light dark:bg-brand-primary-dark" />
                                </div>
                            ) : (
                                // Circle for future step
                                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-base-300-light dark:border-base-300-dark bg-base-200-light dark:bg-base-200-dark">
                                    <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                                </div>
                            )}

                            {/* Text Label */}
                            <span className={`mt-2 text-center text-xs font-medium ${
                                stepIdx <= completedSteps 
                                ? 'text-content-100-light dark:text-content-100-dark' 
                                : 'text-content-200-light dark:text-content-200-dark'
                            } ${
                                stepIdx === currentStep && 'font-bold text-brand-primary-light dark:text-brand-primary-dark'
                            }`}>
                                {step}
                            </span>
                        </button>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Stepper;