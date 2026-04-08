import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, DailyRecord, AssessmentLog, CareerGoal } from '../types';
import { learningModules } from '../data/learningData';

interface AppState {
  user: User | null;
  dailyRecords: DailyRecord[];
  assessmentLogs: AssessmentLog[];
  currentModuleIndex: number;
  currentTopicIndex: number;
  currentQuestionIndex: number;
  userAnswers: string[];
  setUser: (user: User) => void;
  addDailyRecord: (record: DailyRecord) => void;
  addAssessmentLog: (log: AssessmentLog) => void;
  nextModule: () => void;
  nextTopic: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  setUserAnswers: (answers: string[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      dailyRecords: [],
      assessmentLogs: [],
      currentModuleIndex: 0,
      currentTopicIndex: 0,
      currentQuestionIndex: 0,
      userAnswers: [],

      setUser: (user) => set({ user }),

      addDailyRecord: (record) => set((state) => ({
        dailyRecords: [...state.dailyRecords, record]
      })),

      addAssessmentLog: (log) => set((state) => ({
        assessmentLogs: [...state.assessmentLogs, log]
      })),

      nextModule: () => set((state) => ({
        currentModuleIndex: Math.min(state.currentModuleIndex + 1, learningModules.length - 1),
        currentTopicIndex: 0
      })),

      nextTopic: () => set((state) => {
        const currentModule = learningModules[state.currentModuleIndex];
        const nextTopic = state.currentTopicIndex + 1;
        if (nextTopic >= currentModule.topics.length) {
          return {
            currentTopicIndex: 0,
            currentModuleIndex: Math.min(state.currentModuleIndex + 1, learningModules.length - 1)
          };
        }
        return { currentTopicIndex: nextTopic };
      }),

      nextQuestion: () => set((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + 1
      })),

      resetQuiz: () => set({
        currentQuestionIndex: 0,
        userAnswers: []
      }),

      setUserAnswers: (answers) => set({ userAnswers: answers })
    }),
    {
      name: 'ai-learning-storage'
    }
  )
);
