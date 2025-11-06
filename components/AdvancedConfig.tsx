import React from 'react';
import { AdvancedConfig } from '../types';

interface AdvancedConfigComponentProps {
  config: AdvancedConfig;
  onConfigChange: (newConfig: AdvancedConfig) => void;
}

const AdvancedConfigComponent: React.FC<AdvancedConfigComponentProps> = ({ config, onConfigChange }) => {
  const handleConfigChange = (field: keyof AdvancedConfig, value: string | number) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <div className="p-4 border rounded-lg bg-base-200-light dark:bg-base-200-dark border-base-300-light dark:border-base-300-dark text-left">
      <h3 className="text-lg font-semibold mb-4 text-content-100-light dark:text-content-100-dark">Cài đặt nâng cao</h3>
      <div className="space-y-4">
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
    </div>
  );
};

export default AdvancedConfigComponent;
