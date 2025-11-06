import React from 'react';
import { Question } from '../types';
import { SparklesIcon } from './icons';

interface QuestionCardProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  isAiSuggested: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, value, onChange, isAiSuggested }) => {
  return (
    <div className="bg-base-100-light dark:bg-base-100-dark p-6 rounded-lg shadow-md transition-all duration-300">
      <div className="flex items-center mb-2">
        <label htmlFor={question.id} className="block text-lg font-semibold text-content-100-light dark:text-content-100-dark">
          {question.label}
        </label>
        {isAiSuggested && (
          <span title="Gợi ý bởi AI" className="ml-2 text-brand-secondary-light dark:text-brand-secondary-dark">
            <SparklesIcon />
          </span>
        )}
      </div>
      <p className="text-sm text-content-200-light dark:text-content-200-dark mb-4">
        {question.description}
      </p>
      <textarea
        id={question.id}
        name={question.id}
        rows={5}
        className="w-full p-3 bg-base-200-light dark:bg-base-200-dark border border-base-300-light dark:border-base-300-dark rounded-md focus:ring-2 focus:ring-brand-primary-light dark:focus:ring-brand-primary-dark focus:border-brand-primary-light dark:focus:border-brand-primary-dark transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nhập câu trả lời của bạn ở đây..."
      />
    </div>
  );
};

export default QuestionCard;
