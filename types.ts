export interface Question {
    id: string;
    promptLabel: string;
    label: string;
    description: string;
}

export interface Answers {
    [key: string]: string;
}

export interface Template {
    id: string;
    name: string;
    description: string;
    answers: Answers;
}

export interface AdvancedConfig {
    apiKey: string; // Restored to allow user input
    model: string;
    temperature: number;
    topP: number;
    topK: number;
}

export interface Project {
  id: string;
  name: string;
  lastSaved: string; // ISO string for date
  state: {
    // FIX: Allow 'dashboard' state to be saved in a project.
    appState: 'dashboard' | 'wizard' | 'summary' | 'result';
    answers: Answers;
    currentStep: number;
    prompt: string;
    config: AdvancedConfig;
  };
}