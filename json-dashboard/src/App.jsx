import { useState } from 'react'
import JsonInputPanel from './components/JsonInputPanel'
import InsightsPanel from './components/InsightsPanel'
import { analyzeJsonData } from './utils/dataAnalyzer'

function App() {
  const [jsonData, setJsonData] = useState(null)
  const [insights, setInsights] = useState(null)
  const [error, setError] = useState(null)

  const handleJsonInput = (inputText) => {
    try {
      const parsed = JSON.parse(inputText)
      setJsonData(parsed)
      const analysis = analyzeJsonData(parsed)
      setInsights(analysis)
      setError(null)
    } catch (err) {
      setError('Invalid JSON format')
      setJsonData(null)
      setInsights(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">JSON Dashboard</h1>
            <div className="text-sm text-gray-500">
              Paste JSON data to see interactive insights
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          <JsonInputPanel 
            onJsonInput={handleJsonInput}
            error={error}
          />
          <InsightsPanel 
            insights={insights}
            jsonData={jsonData}
          />
        </div>
      </main>
    </div>
  )
}

export default App
