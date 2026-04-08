import { Link } from 'react-router-dom';
import { BookOpen, Brain, TrendingUp, Target } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Home() {
  const { user, dailyRecords } = useAppStore();

  const stats = {
    totalDays: dailyRecords.length,
    currentStreak: 0,
    modulesCompleted: 0,
    avgScore: dailyRecords.length > 0 
      ? Math.round(dailyRecords.reduce((sum, r) => sum + r.quizScore, 0) / dailyRecords.length)
      : 0
  };

  const features = [
    {
      icon: BookOpen,
      title: '系统化学习',
      description: '按照职业路径规划，循序渐进地学习计算机专业知识'
    },
    {
      icon: Brain,
      title: 'AI智能测评',
      description: '每日测验，根据答题情况动态调整学习进度'
    },
    {
      icon: TrendingUp,
      title: '进度追踪',
      description: '详细记录每日学习情况，生成个性化评估报告'
    },
    {
      icon: Target,
      title: '就业导向',
      description: '针对计算机职业需求，帮助你提前做好就业准备'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          欢迎来到 <span className="text-blue-600">AI学习助手</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          个性化1对1系统化学习平台，根据你的进度灵活调整，助你早日实现计算机职业梦想
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/learn"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            开始学习
          </Link>
          <Link
            to="/settings"
            className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            个人设置
          </Link>
        </div>
      </div>

      {user && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl font-bold text-blue-600">{stats.totalDays}</div>
            <div className="text-gray-600">学习天数</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl font-bold text-green-600">{stats.currentStreak}</div>
            <div className="text-gray-600">连续学习</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl font-bold text-purple-600">{stats.modulesCompleted}</div>
            <div className="text-gray-600">完成模块</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl font-bold text-orange-600">{stats.avgScore}%</div>
            <div className="text-gray-600">平均得分</div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">核心功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
