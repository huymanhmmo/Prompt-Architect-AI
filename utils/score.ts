
import { Answers } from '../types';

export const calculateAnsweredQuestions = (answers: Answers, totalQuestions: number): number => {
    // FIX: Add type check for 'string' before calling trim() to prevent runtime errors.
    return Object.values(answers).filter(answer => typeof answer === 'string' && answer.trim() !== '').length;
};

export const calculateCompletenessScore = (answers: Answers, totalQuestions: number): number => {
    const answeredCount = calculateAnsweredQuestions(answers, totalQuestions);
    if (totalQuestions === 0) return 0;
    return Math.round((answeredCount / totalQuestions) * 100);
};