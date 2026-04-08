import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { quizQuestions, learningModules } from '../data/learningData';

export default function Quiz() {
  const { 
    currentModuleIndex, 
    currentQuestionIndex, 
    userAnswers, 
    nextQuestion, 
    resetQuiz, 
    setUserAnswers,
    addDailyRecord,
    addAssessmentLog
  } = useAppStore();
  
  const currentModule = learningModules[currentModuleIndex];
  const moduleQuestions = quizQuestions.filter(q => q.module === currentModule.id);
  
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentQuestion = moduleQuestions[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= moduleQuestions.length;

  const calculateScore = () => {
    let correct = 0;
    moduleQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / moduleQuestions.length) * 100);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex + 1 >= moduleQuestions.length) {
      finishQuiz(newAnswers);
    } else {
      nextQuestion();
      setSelectedAnswer(null);
    }
  };

  const finishQuiz = (answers: string[]) => {
    const score = calculateScore();
    const today = new Date().toISOString().split('T')[0];

    addDailyRecord({
      id: Date.now().toString(),
      userId: 'user-1',
      date: today,
      module: currentModule.name,
      quizScore: score,
      notes: score >= 80 ? '表现优秀！' : score >= 60 ? '继续加油！' : '需要复习'
    });

    addAssessmentLog({
      id: Date.now().toString(),
      userId: 'user-1',
      date: today,
      overallProgress: score >= 80 ? '进展顺利' : score >= 60 ? '进展一般' : '需要加强',
      strengths: score >= 80 ? ['知识点掌握牢固', '理解能力强'] : ['学习态度认真'],
      weaknesses: score < 80 ? ['部分概念需要深化', '需要更多练习'] : [],
      recommendations: score >= 80 
        ? ['继续保持，进入下一模块', '尝试解决更复杂的问题']
        : ['复习今日知识点', '多做相关练习题'],
      nextDayPlan: score >= 80 
        ? '学习下一模块内容' 
        : '复习本模块，重点巩固薄弱环节'
    });

    setShowResult(true);
  };

  const handleRestart = () => {
    resetQuiz();
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult || isFinished) {
    const score = calculateScore();
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
            <Award className="text-yellow-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">测验完成！</h1>
          <p className="text-gray-600 mb-8">你的得分是：</p>
          <div className={`text-6xl font-bold mb-8 ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {score}%
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">正确</div>
              <div className="text-2xl font-bold text-green-600">
                {userAnswers.filter((a, i) => a === moduleQuestions[i]?.correctAnswer).length}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">错误</div>
              <div className="text-2xl font-bold text-red-600">
                {userAnswers.filter((a, i) => a && a !== moduleQuestions[i]?.correctAnswer).length}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              重新测验
            </button>
            <Link
              to="/reports"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              查看报告
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">每日测验</h1>
        <p className="text-gray-600">
          问题 {currentQuestionIndex + 1} / {moduleQuestions.length}
        </p>
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / moduleQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === option ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {currentQuestionIndex + 1 >= moduleQuestions.length ? '完成测验' : '下一题'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
