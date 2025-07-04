import { BarChart3, PieChart, TrendingUp, Database, Info } from 'lucide-react'
import ChartComponent from './ChartComponent'
import DataSummary from './DataSummary'
import FieldAnalysis from './FieldAnalysis'

const InsightsPanel = ({ insights, jsonData }) => {
  if (!insights || !jsonData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">No Data to Analyze</h3>
          <p className="text-gray-400">Paste valid JSON data in the left panel to see insights and visualizations.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
        <BarChart3 className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Data Insights</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Data Summary */}
          <DataSummary summary={insights.summary} structure={insights.structure} />
          
          {/* Field Analysis */}
          {insights.statistics && (
            <FieldAnalysis statistics={insights.statistics} />
          )}
          
          {/* Visualizations */}
          {insights.visualizations && insights.visualizations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Visualizations</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {insights.visualizations.map((viz, index) => (
                  <ChartComponent key={index} visualization={viz} />
                ))}
              </div>
            </div>
          )}
          
          {/* Raw Data Preview */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Data Preview</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsightsPanel