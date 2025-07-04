export const analyzeJsonData = (data) => {
  const insights = {
    structure: analyzeStructure(data),
    statistics: analyzeStatistics(data),
    visualizations: generateVisualizations(data),
    summary: generateSummary(data)
  }
  
  return insights
}

const analyzeStructure = (data) => {
  const structure = {
    type: Array.isArray(data) ? 'array' : typeof data,
    depth: calculateDepth(data),
    keys: [],
    totalItems: 0
  }
  
  if (Array.isArray(data)) {
    structure.totalItems = data.length
    if (data.length > 0 && typeof data[0] === 'object') {
      structure.keys = Object.keys(data[0])
    }
  } else if (typeof data === 'object' && data !== null) {
    structure.keys = Object.keys(data)
    structure.totalItems = structure.keys.length
  }
  
  return structure
}

const analyzeStatistics = (data) => {
  const stats = {
    numericalFields: [],
    categoricalFields: [],
    dateFields: [],
    fieldTypes: {}
  }
  
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    const sample = data[0]
    Object.keys(sample).forEach(key => {
      const values = data.map(item => item[key]).filter(val => val !== null && val !== undefined)
      const fieldType = determineFieldType(values)
      
      stats.fieldTypes[key] = fieldType
      
      if (fieldType === 'number') {
        const numValues = values.map(Number).filter(n => !isNaN(n))
        stats.numericalFields.push({
          name: key,
          min: Math.min(...numValues),
          max: Math.max(...numValues),
          avg: numValues.reduce((a, b) => a + b, 0) / numValues.length,
          count: numValues.length
        })
      } else if (fieldType === 'string') {
        const uniqueValues = [...new Set(values)]
        stats.categoricalFields.push({
          name: key,
          uniqueCount: uniqueValues.length,
          values: uniqueValues.slice(0, 10) // Top 10 values
        })
      } else if (fieldType === 'date') {
        stats.dateFields.push({
          name: key,
          earliest: new Date(Math.min(...values.map(d => new Date(d)))),
          latest: new Date(Math.max(...values.map(d => new Date(d))))
        })
      }
    })
  }
  
  return stats
}

const generateVisualizations = (data) => {
  const visualizations = []
  
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    const sample = data[0]
    const keys = Object.keys(sample)
    
    // Generate chart configurations based on data types
    keys.forEach(key => {
      const values = data.map(item => item[key]).filter(val => val !== null && val !== undefined)
      const fieldType = determineFieldType(values)
      
      if (fieldType === 'number') {
        // Histogram for numerical data
        visualizations.push({
          type: 'histogram',
          field: key,
          title: `Distribution of ${key}`,
          data: values.map(Number).filter(n => !isNaN(n))
        })
        
        // If there's another numerical field, create scatter plot
        const otherNumField = keys.find(k => k !== key && determineFieldType(data.map(item => item[k])) === 'number')
        if (otherNumField) {
          visualizations.push({
            type: 'scatter',
            xField: key,
            yField: otherNumField,
            title: `${key} vs ${otherNumField}`,
            data: data.map(item => ({
              x: Number(item[key]),
              y: Number(item[otherNumField])
            })).filter(point => !isNaN(point.x) && !isNaN(point.y))
          })
        }
      } else if (fieldType === 'string') {
        // Bar chart for categorical data
        const valueCounts = values.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1
          return acc
        }, {})
        
        visualizations.push({
          type: 'bar',
          field: key,
          title: `Count by ${key}`,
          data: Object.entries(valueCounts).map(([label, count]) => ({ label, count }))
        })
      }
    })
  } else if (typeof data === 'object' && data !== null) {
    // Handle object data by creating visualizations for nested arrays or numerical values
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        if (typeof value[0] === 'number') {
          visualizations.push({
            type: 'line',
            field: key,
            title: `Trend of ${key}`,
            data: value.map((val, index) => ({ x: index, y: val }))
          })
        }
      }
    })
  }
  
  return visualizations.slice(0, 6) // Limit to 6 visualizations
}

const generateSummary = (data) => {
  const summary = {
    totalRecords: 0,
    dataType: '',
    keyInsights: []
  }
  
  if (Array.isArray(data)) {
    summary.totalRecords = data.length
    summary.dataType = 'Array of records'
    
    if (data.length > 0 && typeof data[0] === 'object') {
      const keys = Object.keys(data[0])
      summary.keyInsights.push(`Contains ${keys.length} fields per record`)
      
      // Find most common field types
      const fieldTypes = keys.map(key => {
        const values = data.map(item => item[key])
        return determineFieldType(values)
      })
      
      const typeCount = fieldTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {})
      
      Object.entries(typeCount).forEach(([type, count]) => {
        summary.keyInsights.push(`${count} ${type} field(s)`)
      })
    }
  } else if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data)
    summary.totalRecords = keys.length
    summary.dataType = 'Object with properties'
    summary.keyInsights.push(`Contains ${keys.length} top-level properties`)
  }
  
  return summary
}

const calculateDepth = (obj, depth = 1) => {
  if (typeof obj !== 'object' || obj === null) return depth
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return depth
    return Math.max(...obj.map(item => calculateDepth(item, depth + 1)))
  }
  
  const keys = Object.keys(obj)
  if (keys.length === 0) return depth
  
  return Math.max(...keys.map(key => calculateDepth(obj[key], depth + 1)))
}

const determineFieldType = (values) => {
  if (values.length === 0) return 'unknown'
  
  const nonNullValues = values.filter(val => val !== null && val !== undefined)
  if (nonNullValues.length === 0) return 'null'
  
  // Check if all values are numbers
  const numericValues = nonNullValues.filter(val => !isNaN(Number(val)) && val !== '')
  if (numericValues.length === nonNullValues.length) return 'number'
  
  // Check if all values are valid dates
  const dateValues = nonNullValues.filter(val => {
    const date = new Date(val)
    return !isNaN(date.getTime()) && typeof val === 'string' && val.match(/\d{4}-\d{2}-\d{2}/)
  })
  if (dateValues.length === nonNullValues.length) return 'date'
  
  // Check if all values are booleans
  const boolValues = nonNullValues.filter(val => typeof val === 'boolean' || val === 'true' || val === 'false')
  if (boolValues.length === nonNullValues.length) return 'boolean'
  
  return 'string'
}