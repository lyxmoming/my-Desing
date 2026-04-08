import { useState } from 'react';
import { User, Target, Save, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import type { CareerGoal } from '../types';

export default function Settings() {
  const { user, setUser, dailyRecords, assessmentLogs } = useAppStore();
  const [name, setName] = useState(user?.name || '');
  const [careerGoal, setCareerGoal] = useState<CareerGoal>(user?.careerGoal || 'frontend');
  const [saved, setSaved] = useState(false);

  const careerOptions: { value: CareerGoal; label: string; desc: string }[] = [
    { value: 'frontend', label: '前端开发', desc: '专注于Web界面开发，学习React、Vue等框架' },
    { value: 'backend', label: '后端开发', desc: '专注于服务端开发，学习Node.js、数据库等' },
    { value: 'fullstack', label: '全栈开发', desc: '同时学习前端和后端，成为全能开发者' },
    { value: 'algorithm', label: '算法工程师', desc: '专注于算法和数据结构，准备技术面试' },
    { value: 'devops', label: 'DevOps工程师', desc: '学习运维和自动化，CI/CD流程' }
  ];

  const handleSave = () => {
    setUser({
      id: 'user-1',
      name,
      careerGoal,
      startDate: user?.startDate || new Date().toISOString().split('T')[0]
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('确定要重置所有学习数据吗？此操作不可恢复！')) {
      localStorage.removeItem('ai-learning-storage');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">个人设置</h1>
        <p className="text-gray-600">管理你的个人信息和学习偏好</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">基本信息</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              姓名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入你的姓名"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border">
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-purple-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">职业目标</h2>
        </div>

        <div className="space-y-3">
          {careerOptions.map((option) => (
            <label
              key={option.value}
              className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                careerGoal === option.value
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="careerGoal"
                  value={option.value}
                  checked={careerGoal === option.value}
                  onChange={(e) => setCareerGoal(e.target.value as CareerGoal)}
                  className="w-4 h-4 text-purple-600"
                />
                <div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.desc}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <Trash2 size={18} />
          重置所有数据
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <Save size={18} />
          {saved ? '已保存！' : '保存设置'}
        </button>
      </div>

      {user && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">当前学习概览</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-600">开始学习日期：</span>
              <span className="text-blue-900 ml-2">{user.startDate}</span>
            </div>
            <div>
              <span className="text-blue-600">学习记录：</span>
              <span className="text-blue-900 ml-2">{dailyRecords.length} 天</span>
            </div>
            <div>
              <span className="text-blue-600">评估报告：</span>
              <span className="text-blue-900 ml-2">{assessmentLogs.length} 份</span>
            </div>
            <div>
              <span className="text-blue-600">职业目标：</span>
              <span className="text-blue-900 ml-2">
                {careerOptions.find(o => o.value === user.careerGoal)?.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
