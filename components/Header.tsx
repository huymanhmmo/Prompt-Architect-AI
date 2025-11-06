import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, SaveIcon, CheckIcon, SettingsIcon } from './icons';

interface HeaderProps {
    onNewProject: () => void;
    onSaveProject: () => void;
    isProjectActive: boolean;
    isSaveEnabled: boolean;
    onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewProject, onSaveProject, isProjectActive, isSaveEnabled, onOpenSettings }) => {
  const { theme, toggleTheme } = useTheme();
  const [justSaved, setJustSaved] = useState(false);

  const handleSaveClick = () => {
      if (!isSaveEnabled) return;
      onSaveProject();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
  }

  // If saving is enabled due to new changes, reset the "just saved" state immediately
  useEffect(() => {
    if (isSaveEnabled) {
        setJustSaved(false);
    }
  }, [isSaveEnabled]);

  return (
    <header className="bg-base-100-light dark:bg-base-100-dark p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-primary-light dark:text-brand-primary-dark">
          Prompt Architect AI
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
           {isProjectActive && (
             <button
                onClick={handleSaveClick}
                disabled={!isSaveEnabled}
                className="flex items-center px-3 sm:px-4 py-2 text-sm font-medium bg-brand-primary-light dark:bg-brand-primary-dark text-white rounded-md hover:bg-brand-secondary-light dark:hover:bg-brand-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {justSaved && !isSaveEnabled ? <CheckIcon /> : <SaveIcon />}
                <span className="ml-2 hidden sm:inline">{justSaved && !isSaveEnabled ? 'Đã lưu!' : 'Lưu dự án'}</span>
              </button>
           )}
           <button
            onClick={onNewProject}
            className="px-3 sm:px-4 py-2 text-sm font-medium bg-base-200-light dark:bg-base-200-dark rounded-md hover:bg-base-300-light dark:hover:bg-base-300-dark transition-colors"
          >
            Dự án mới
          </button>
           <button
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-base-200-light dark:hover:bg-base-200-dark transition-colors"
            aria-label="Open settings"
          >
            <SettingsIcon />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-base-200-light dark:hover:bg-base-200-dark transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;