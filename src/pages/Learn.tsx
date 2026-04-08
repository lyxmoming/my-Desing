import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { learningModules } from '../data/learningData';

export default function Learn() {
  const { currentModuleIndex, currentTopicIndex, nextTopic } = useAppStore();
  const currentModule = learningModules[currentModuleIndex];
  const currentTopic = currentModule.topics[currentTopicIndex];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">学习中心</h1>
        <p className="text-gray-600">循序渐进，掌握计算机专业知识</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{currentModule.name}</h2>
            <p className="text-gray-600">{currentModule.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">进度</div>
            <div className="text-lg font-semibold text-blue-600">
              {currentTopicIndex + 1} / {currentModule.topics.length}
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-blue-600" size={24} />
            <h3 className="text-xl font-semibold text-gray-900">{currentTopic.name}</h3>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 text-lg leading-relaxed">{currentTopic.content}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">示例代码：</h4>
            <div className="space-y-2">
              {currentTopic.examples.map((example, index) => (
                <div key={index} className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
                  {example}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {currentModule.topics.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < currentTopicIndex
                      ? 'bg-green-500'
                      : index === currentTopicIndex
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <Link
                to="/quiz"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                开始测验
              </Link>
              <button
                onClick={nextTopic}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                下一个知识点
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">学习模块列表</h3>
        <div className="space-y-3">
          {learningModules.map((module, index) => (
            <div
              key={module.id}
              className={`p-4 rounded-lg border flex items-center justify-between ${
                index === currentModuleIndex
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {index < currentModuleIndex ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : index === currentModuleIndex ? (
                  <div className="w-5 h-5 rounded-full bg-blue-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                <div>
                  <div className="font-medium text-gray-900">{module.name}</div>
                  <div className="text-sm text-gray-500">{module.topics.length} 个知识点</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
