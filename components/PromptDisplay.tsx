import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyIcon, CheckIcon, EditIcon } from './icons';

interface PromptDisplayProps {
  prompt: string;
  onEdit: () => void;
  onStartNew: () => void;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, onEdit, onStartNew }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 animate-fade-in">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-content-100-light dark:text-content-100-dark">
                Technical Prompt của bạn đã sẵn sàng!
            </h2>
            <div className="flex space-x-2">
                <button
                    onClick={onStartNew}
                    className="flex items-center px-4 py-2 bg-base-200-light dark:bg-base-200-dark text-content-100-light dark:text-content-100-dark rounded-md hover:bg-base-300-light dark:hover:bg-base-300-dark transition-colors"
                >
                    Bắt đầu dự án mới
                </button>
                <button
                    onClick={onEdit}
                    className="flex items-center px-4 py-2 bg-base-200-light dark:bg-base-200-dark text-content-100-light dark:text-content-100-dark rounded-md hover:bg-base-300-light dark:hover:bg-base-300-dark transition-colors"
                >
                    <EditIcon />
                    <span className="ml-2">Chỉnh sửa</span>
                </button>
                 <button
                    onClick={handleCopy}
                    className="flex items-center px-4 py-2 bg-brand-primary-light dark:bg-brand-primary-dark text-white rounded-md hover:bg-brand-secondary-light dark:hover:bg-brand-secondary-dark transition-colors"
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    <span className="ml-2">{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
                </button>
            </div>
        </div>
      <div className="prose dark:prose-invert max-w-none bg-base-100-light dark:bg-base-100-dark p-6 rounded-lg shadow-inner">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{prompt}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PromptDisplay;