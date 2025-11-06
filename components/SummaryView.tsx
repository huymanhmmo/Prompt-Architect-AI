import React from 'react';
import { Answers } from '../types';
import { QUESTIONS } from '../utils/questions';
import { calculateCompletenessScore } from '../utils/score';
import ScoreIndicator from './ScoreIndicator';
import { ArrowLeftIcon } from './icons';

interface SummaryViewProps {
  answers: Answers;
  onGenerate: () => void;
  isLoading: boolean;
  onBack: () => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ answers, onGenerate, isLoading, onBack }) => {
  const score = calculateCompletenessScore(answers, QUESTIONS.length);

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-content-100-light dark:text-content-100-dark mb-4">Hoàn tất!</h2>
      <p className="text-content-200-light dark:text-content-200-dark mb-8">
        Bạn đã trả lời {Object.values(answers).filter(a => a).length}/{QUESTIONS.length} câu hỏi. Dưới đây là mức độ hoàn chỉnh.
      </p>
      <ScoreIndicator score={score} />
      <p className="mt-4 mb-8 text-content-200-light dark:text-content-200-dark">
        {score < 50 ? "Bạn có thể quay lại để trả lời thêm câu hỏi để có prompt chi tiết hơn." : "Kết quả rất tốt! Sẵn sàng để tạo prompt."}
      </p>

      <div className="flex justify-center items-center space-x-4 mt-8">
         <button
            onClick={onBack}
            className="flex items-center px-6 py-3 bg-base-200-light dark:bg-base-200-dark text-content-100-light dark:text-content-100-dark rounded-lg hover:bg-base-300-light dark:hover:bg-base-300-dark transition-colors"
          >
            <ArrowLeftIcon />
            <span className="ml-2">Quay lại</span>
          </button>
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="px-8 py-4 bg-brand-primary-light dark:bg-brand-primary-dark text-white font-bold rounded-lg hover:bg-brand-secondary-light dark:hover:bg-brand-secondary-dark transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang tạo...' : 'Tạo Technical Prompt'}
          </button>
      </div>
    </div>
  );
};

export default SummaryView;