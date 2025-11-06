import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, SparklesIcon } from './icons';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled: boolean;
  onGenerateSuggestions: () => void;
  isGeneratingSuggestions: boolean;
  isFirstStepAnswered: boolean;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  isNextDisabled,
  onGenerateSuggestions,
  isGeneratingSuggestions,
  isFirstStepAnswered
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between items-center mt-8 pt-4 border-t border-base-300-light dark:border-base-300-dark">
      <button
        onClick={onPrev}
        disabled={isFirstStep}
        className="flex items-center px-4 py-2 bg-base-200-light dark:bg-base-200-dark text-content-100-light dark:text-content-100-dark rounded-md hover:bg-base-300-light dark:hover:bg-base-300-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeftIcon />
        <span className="ml-2">Quay lại</span>
      </button>

      <div className="flex-grow text-center">
        {isFirstStep && (
          <button
            onClick={onGenerateSuggestions}
            disabled={isGeneratingSuggestions || !isFirstStepAnswered}
            className="flex items-center justify-center mx-auto px-4 py-2 bg-brand-secondary-light dark:bg-brand-secondary-dark text-white rounded-md hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SparklesIcon />
            <span className="ml-2">{isGeneratingSuggestions ? 'Đang tạo gợi ý...' : 'Tạo gợi ý bằng AI'}</span>
          </button>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="flex items-center px-4 py-2 bg-brand-primary-light dark:bg-brand-primary-dark text-white rounded-md hover:bg-brand-secondary-light dark:hover:bg-brand-secondary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span className="mr-2">{isLastStep ? 'Hoàn tất' : 'Tiếp theo'}</span>
        {isLastStep ? <CheckCircleIcon /> : <ArrowRightIcon />}
      </button>
    </div>
  );
};

export default WizardNavigation;
