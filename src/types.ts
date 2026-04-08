
export type CareerGoal = 'frontend' | 'backend' | 'fullstack' | 'algorithm' | 'devops';

export interface User {
  id: string;
  name: string;
  careerGoal: CareerGoal;
  startDate: string;
}

export interface Topic {
  id: string;
  name: string;
  content: string;
  examples: string[];
}

export interface LearningModule {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface LearningPath {
  id: string;
  userId: string;
  careerPath: CareerGoal;
  modules: LearningModule[];
  currentModule: number;
}

export interface DailyRecord {
  id: string;
  userId: string;
  date: string;
  module: string;
  quizScore: number;
  notes: string;
}

export interface QuizQuestion {
  id: string;
  module: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface AssessmentLog {
  id: string;
  userId: string;
  date: string;
  overallProgress: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  nextDayPlan: string;
}
