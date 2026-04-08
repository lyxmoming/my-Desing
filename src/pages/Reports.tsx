import { Calendar, TrendingUp, Star, AlertCircle, BookOpen } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Reports() {
  const { dailyRecords, assessmentLogs } = useAppStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">学习报告</h1>
        <p className="text-gray-600">查看你的学习进度和AI评估分析</p>
      </div>

      {assessmentLogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">暂无报告</h2>
          <p className="text-gray-600">完成第一次测验后，AI将为你生成学习评估报告</p>
        </div>
      ) : (
        <div className="space-y-8">
          {assessmentLogs.slice().reverse().map((log) => (
            <div key={log.id} className="bg-white rounded-xl p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-blue-600" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{log.date} 学习报告</h2>
                  <p className="text-gray-600">AI智能评估分析</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="text-blue-600" size={24} />
                    <h3 className="font-semibold text-gray-900">总体进度</h3>
                  </div>
                  <p className="text-gray-700 text-lg">{log.overallProgress}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="text-purple-600" size={24} />
                    <h3 className="font-semibold text-gray-900">明日计划</h3>
                  </div>
                  <p className="text-gray-700 text-lg">{log.nextDayPlan}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="text-green-600" size={24} />
                    <h3 className="font-semibold text-gray-900">优势</h3>
                  </div>
                  <ul className="space-y-2">
                    {log.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-600 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="text-orange-600" size={24} />
                    <h3 className="font-semibold text-gray-900">待改进</h3>
                  </div>
                  <ul className="space-y-2">
                    {log.weaknesses.length > 0 ? (
                      log.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="text-orange-600 mt-1">•</span>
                          {weakness}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">暂无明显弱项，继续保持！</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">AI建议</h3>
                <ul className="space-y-2">
                  {log.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 font-bold mt-1">{index + 1}.</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-6">学习记录历史</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">日期</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">学习模块</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">测验得分</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">备注</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyRecords.slice().reverse().map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{record.date}</td>
                      <td className="py-3 px-4 text-gray-900">{record.module}</td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${
                          record.quizScore >= 80 ? 'text-green-600' :
                          record.quizScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {record.quizScore}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{record.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
