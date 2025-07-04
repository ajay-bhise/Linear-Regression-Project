import { BarChart2, Type, Calendar, Hash } from 'lucide-react'

const FieldAnalysis = ({ statistics }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Field Analysis</h3>
      </div>
      
      <div className="space-y-4">
        {/* Numerical Fields */}
        {statistics.numericalFields.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-blue-500" />
              <h4 className="font-semibold text-gray-800">Numerical Fields</h4>
            </div>
            <div className="grid gap-3">
              {statistics.numericalFields.map((field, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="font-medium text-blue-900 mb-2">{field.name}</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">Min:</span>
                      <span className="ml-1 text-blue-800">{field.min.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Max:</span>
                      <span className="ml-1 text-blue-800">{field.max.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Avg:</span>
                      <span className="ml-1 text-blue-800">{field.avg.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Count:</span>
                      <span className="ml-1 text-blue-800">{field.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Categorical Fields */}
        {statistics.categoricalFields.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-4 h-4 text-green-500" />
              <h4 className="font-semibold text-gray-800">Categorical Fields</h4>
            </div>
            <div className="grid gap-3">
              {statistics.categoricalFields.map((field, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="font-medium text-green-900 mb-2">{field.name}</div>
                  <div className="text-sm mb-2">
                    <span className="text-green-600 font-medium">Unique values:</span>
                    <span className="ml-1 text-green-800">{field.uniqueCount}</span>
                  </div>
                  {field.values.length > 0 && (
                    <div>
                      <div className="text-xs text-green-600 font-medium mb-1">Sample values:</div>
                      <div className="flex flex-wrap gap-1">
                        {field.values.slice(0, 5).map((value, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                          >
                            {String(value)}
                          </span>
                        ))}
                        {field.values.length > 5 && (
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                            +{field.values.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Date Fields */}
        {statistics.dateFields.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-purple-500" />
              <h4 className="font-semibold text-gray-800">Date Fields</h4>
            </div>
            <div className="grid gap-3">
              {statistics.dateFields.map((field, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <div className="font-medium text-purple-900 mb-2">{field.name}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-purple-600 font-medium">Earliest:</span>
                      <span className="ml-1 text-purple-800">
                        {field.earliest.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-purple-600 font-medium">Latest:</span>
                      <span className="ml-1 text-purple-800">
                        {field.latest.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Field Types Overview */}
        {Object.keys(statistics.fieldTypes).length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Field Types</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(statistics.fieldTypes).map(([field, type], index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-gray-600">{field}:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      type === 'number' ? 'bg-blue-100 text-blue-800' :
                      type === 'string' ? 'bg-green-100 text-green-800' :
                      type === 'date' ? 'bg-purple-100 text-purple-800' :
                      type === 'boolean' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FieldAnalysis