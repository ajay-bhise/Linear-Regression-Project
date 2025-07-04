import { FileText, Hash, Layers } from 'lucide-react'

const DataSummary = ({ summary, structure }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Data Summary</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Total Records</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{summary.totalRecords}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Data Type</span>
          </div>
          <div className="text-sm font-semibold text-green-900">{summary.dataType}</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Depth</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{structure.depth}</div>
        </div>
      </div>
      
      {summary.keyInsights.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Key Insights</h4>
          <ul className="space-y-1">
            {summary.keyInsights.map((insight, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {structure.keys.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-900 mb-2">Available Fields</h4>
          <div className="flex flex-wrap gap-2">
            {structure.keys.map((key, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono"
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DataSummary