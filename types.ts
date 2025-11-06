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
