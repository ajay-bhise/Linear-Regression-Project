import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0']

const ChartComponent = ({ visualization }) => {
  const renderChart = () => {
    switch (visualization.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visualization.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )
      
      case 'histogram':
        // Convert numerical data to histogram bins
        const histogramData = createHistogramBins(visualization.data)
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bin" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visualization.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={visualization.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name={visualization.xField} />
              <YAxis dataKey="y" name={visualization.yField} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter fill="#ffc658" />
            </ScatterChart>
          </ResponsiveContainer>
        )
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visualization.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {visualization.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Chart type not supported: {visualization.type}</p>
          </div>
        )
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">{visualization.title}</h4>
      {renderChart()}
    </div>
  )
}

const createHistogramBins = (data, binCount = 10) => {
  if (data.length === 0) return []
  
  const min = Math.min(...data)
  const max = Math.max(...data)
  const binSize = (max - min) / binCount
  
  const bins = Array.from({ length: binCount }, (_, i) => ({
    bin: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
    count: 0,
    minValue: min + i * binSize,
    maxValue: min + (i + 1) * binSize
  }))
  
  data.forEach(value => {
    const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1)
    bins[binIndex].count++
  })
  
  return bins
}

export default ChartComponent