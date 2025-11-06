import React, { useState, useEffect } from 'react';
import { AdvancedConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: AdvancedConfig) => void;
  currentConfig: AdvancedConfig;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentConfig }) => {
  const [config, setConfig] = useState<AdvancedConfig>(currentConfig);

  useEffect(() => {
    if (isOpen) {
        setConfig(currentConfig);
    }
  }, [isOpen, currentConfig]);


  if (!isOpen) return null;
  
  const handleConfigChange = (field: keyof AdvancedConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="settingsModalTitle">
      <div className="bg-base-200-light dark:bg-base-200-dark p-6 rounded-lg shadow-xl w-full max-w-md m-4">
        <h2 id="settingsModalTitle" className="text-xl font-bold mb-4 text-content-100-light dark:text-content-100-dark">Cài đặt</h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-content-200-light dark:text-content-200-dark">
                Google Gemini API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={config.apiKey}
                onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-base-300-light dark:border-base-300-dark focus:outline-none focus:ring-brand-primary-light dark:focus:ring-brand-primary-dark focus:border-brand-primary-light dark:focus:border-brand-primary-dark sm:text-sm rounded-md bg-base-100-light dark:bg-base-100-dark"
                placeholder="Nhập API Key của bạn..."
              />
               <p className="mt-1 text-xs text-content-200-light dark:text-content-200-dark">API Key của bạn được lưu trữ an toàn trên trình duyệt này.</p>
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-content-200-light dark:text-content-200-dark">
                Mô hình
              </label>
              <select
                id="model"
                value={config.model}
                onChange={(e) => handleConfigChange('model', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-base-300-light dark:border-base-300-dark focus:outline-none focus:ring-brand-primary-light dark:focus:ring-brand-primary-dark focus:border-brand-primary-light dark:focus:border-brand-primary-dark sm:text-sm rounded-md bg-base-100-light dark:bg-base-100-dark"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
              </select>
            </div>
            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-content-200-light dark:text-content-200-dark">
                Nhiệt độ (Sáng tạo): {config.temperature}
              </label>
              <input
                type="range"
                id="temperature"
                min="0"
                max="1"
                step="0.1"
                value={config.temperature}
                onChange={(e) => handleConfigChange('temperature', parseFloat(e.target.value))}
                className="w-full h-2 bg-base-300-light dark:bg-base-300-dark rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="topP" className="block text-sm font-medium text-content-200-light dark:text-content-200-dark">
                Top-P: {config.topP}
              </label>
              <input
                type="range"
                id="topP"
                min="0"
                max="1"
                step="0.1"
                value={config.topP}
                onChange={(e) => handleConfigChange('topP', parseFloat(e.target.value))}
                className="w-full h-2 bg-base-300-light dark:bg-base-300-dark rounded-lg appearance-none cursor-pointer"
              />
            </div>
             <div>
              <label htmlFor="topK" className="block text-sm font-medium text-content-200-light dark:text-content-200-dark">
                Top-K: {config.topK}
              </label>
              <input
                type="range"
                id="topK"
                min="1"
                max="100"
                step="1"
                value={config.topK}
                onChange={(e) => handleConfigChange('topK', parseInt(e.target.value, 10))}
                className="w-full h-2 bg-base-300-light dark:bg-base-300-dark rounded-lg appearance-none cursor-pointer"
              />
            </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-base-300-light dark:border-base-300-dark">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-base-300-light dark:bg-base-300-dark text-content-100-light dark:text-content-100-dark rounded-md hover:opacity-80 transition-opacity"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="px-4 py-2 bg-brand-primary-light dark:bg-brand-primary-dark text-white rounded-md hover:bg-brand-secondary-light dark:hover:bg-brand-secondary-dark transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
