import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
    onNewProject: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewProject }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-base-100-light dark:bg-base-100-dark p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-primary-light dark:text-brand-primary-dark">
          Prompt Architect AI
        </h1>
        <div className="flex items-center space-x-4">
           <button
            onClick={onNewProject}
            className="px-4 py-2 text-sm font-medium bg-base-200-light dark:bg-base-200-dark rounded-md hover:bg-base-300-light dark:hover:bg-base-300-dark transition-colors"
          >
            Dự án mới
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