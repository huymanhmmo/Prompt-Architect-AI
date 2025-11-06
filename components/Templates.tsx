import React from 'react';
import { TEMPLATES } from '../utils/templates';
import { Answers, Project } from '../types';
import { EditIcon, TrashIcon } from './icons';

interface DashboardProps {
  onSelectTemplate: (answers: Answers) => void;
  onStartFromScratch: () => void;
  projects: Project[];
  onLoadProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
}

const Templates: React.FC<DashboardProps> = ({ 
    onSelectTemplate, 
    onStartFromScratch, 
    projects, 
    onLoadProject, 
    onDeleteProject 
}) => {
  return (
    <div className="animate-fade-in space-y-16">
      {/* My Projects Section */}
      <div>
        <h2 className="text-3xl font-bold text-content-100-light dark:text-content-100-dark mb-4 text-center">
          Dự án của bạn
        </h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.sort((a, b) => new Date(b.lastSaved).getTime() - new Date(a.lastSaved).getTime()).map((project) => (
              <div key={project.id} className="bg-base-200-light dark:bg-base-200-dark p-4 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="font-bold truncate text-content-100-light dark:text-content-100-dark">{project.name}</h3>
                  <p className="text-xs text-content-200-light dark:text-content-200-dark">
                    Lưu lần cuối: {new Date(project.lastSaved).toLocaleString('vi-VN')}
                  </p>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                   <button 
                     onClick={() => onLoadProject(project.id)}
                     className="px-3 py-1 text-sm bg-brand-primary-light dark:bg-brand-primary-dark text-white rounded hover:bg-brand-secondary-light dark:hover:bg-brand-secondary-dark transition-colors"
                   >
                     Mở
                   </button>
                   <button 
                     onClick={() => onDeleteProject(project.id)}
                     className="p-2 text-red-500 rounded hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                     aria-label={`Delete project ${project.name}`}
                   >
                     <TrashIcon />
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-content-200-light dark:text-content-200-dark text-center">
            Bạn chưa có dự án nào. Hãy bắt đầu một dự án mới bên dưới!
          </p>
        )}
      </div>

      {/* Start New Project Section */}
      <div className="text-center">
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
              className="bg-base-100-light dark:bg-base-100-dark p-4 rounded-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-brand-primary-light dark:hover:ring-brand-primary-dark transition-all text-left flex flex-col items-center justify-center h-full"
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
              className="bg-base-100-light dark:bg-base-100-dark p-4 rounded-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-brand-primary-light dark:hover:ring-brand-primary-dark transition-all text-left flex flex-col items-center justify-center h-full"
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
    </div>
  );
};

export default Templates;
