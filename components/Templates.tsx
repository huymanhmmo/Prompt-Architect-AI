import React from 'react';
import { TEMPLATES } from '../utils/templates';
import { Answers } from '../types';
import { EditIcon } from './icons'; // Using EditIcon for "start from scratch"

interface TemplatesProps {
  onSelectTemplate: (answers: Answers) => void;
  onStartFromScratch: () => void;
}

const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate, onStartFromScratch }) => {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-content-100-light dark:text-content-100-dark mb-4">
        Bắt đầu một dự án mới
      </h2>
      <p className="text-content-200-light dark:text-content-200-dark mb-8 max-w-2xl mx-auto">
        Chọn một mẫu có sẵn để bắt đầu nhanh hơn, hoặc bắt đầu với một trang trống để tự định hình ý tưởng của bạn.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Start from Scratch Button */}
        <button
            onClick={onStartFromScratch}
            className="bg-base-100-light dark:bg-base-100-dark p-4 rounded-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-brand-primary-light dark:hover:ring-brand-primary-dark transition-all text-left flex flex-col items-center justify-center"
        >
            <div className="p-3 bg-base-200-light dark:bg-base-200-dark rounded-full mb-3">
                <EditIcon />
            </div>
            <h3 className="text-lg font-semibold text-content-100-light dark:text-content-100-dark">Bắt đầu từ đầu</h3>
            <p className="text-sm text-content-200-light dark:text-content-200-dark text-center">Xây dựng prompt từ con số không.</p>
        </button>
        
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.answers)}
            className="bg-base-100-light dark:bg-base-100-dark p-4 rounded-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-brand-primary-light dark:hover:ring-brand-primary-dark transition-all text-left flex flex-col items-center justify-center"
          >
             <div className="p-3 bg-base-200-light dark:bg-base-200-dark rounded-full mb-3">
                <template.Icon />
            </div>
            <h3 className="text-lg font-semibold text-content-100-light dark:text-content-100-dark">{template.name}</h3>
            <p className="text-sm text-content-200-light dark:text-content-200-dark text-center">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Templates;