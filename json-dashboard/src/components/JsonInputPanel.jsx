import { useState } from 'react'
import { FileText, AlertCircle, CheckCircle } from 'lucide-react'

const JsonInputPanel = ({ onJsonInput, error }) => {
  const [input, setInput] = useState('')
  const [isValid, setIsValid] = useState(null)

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    
    if (value.trim()) {
      try {
        JSON.parse(value)
        setIsValid(true)
        onJsonInput(value)
      } catch (err) {
        setIsValid(false)
      }
    } else {
      setIsValid(null)
    }
  }

  const handleClear = () => {
    setInput('')
    setIsValid(null)
    onJsonInput('')
  }

  const handleSampleData = () => {
    const sampleData = {
      users: [
        { id: 1, name: "John Doe", age: 30, city: "New York", salary: 50000 },
        { id: 2, name: "Jane Smith", age: 25, city: "Los Angeles", salary: 60000 },
        { id: 3, name: "Bob Johnson", age: 35, city: "Chicago", salary: 55000 },
        { id: 4, name: "Alice Brown", age: 28, city: "Houston", salary: 58000 },
        { id: 5, name: "Charlie Wilson", age: 32, city: "Phoenix", salary: 52000 }
      ],
      sales: [
        { month: "Jan", revenue: 12000, expenses: 8000 },
        { month: "Feb", revenue: 15000, expenses: 9000 },
        { month: "Mar", revenue: 18000, expenses: 10000 },
        { month: "Apr", revenue: 20000, expenses: 11000 },
        { month: "May", revenue: 22000, expenses: 12000 }
      ],
      metadata: {
        created_at: "2024-01-01",
        version: "1.0",
        total_records: 10
      }
    }
    
    const formatted = JSON.stringify(sampleData, null, 2)
    setInput(formatted)
    onJsonInput(formatted)
    setIsValid(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">JSON Input</h2>
        </div>
        <div className="flex items-center gap-2">
          {isValid === true && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
          {isValid === false && (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <button
            onClick={handleSampleData}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Sample Data
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Paste your JSON data here..."
          className="w-full h-full resize-none border-0 outline-none font-mono text-sm leading-relaxed"
          style={{ minHeight: '400px' }}
        />
      </div>
      
      {error && (
        <div className="px-4 py-3 bg-red-50 border-t border-red-200">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}
      
      {isValid === true && (
        <div className="px-4 py-3 bg-green-50 border-t border-green-200">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Valid JSON format</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default JsonInputPanel