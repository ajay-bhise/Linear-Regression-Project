# JSON Dashboard

An interactive web application that allows you to paste JSON data and instantly see visualizations and insights.

## Features

- **Real-time JSON validation** - Paste JSON data and get instant feedback on validity
- **Automatic data analysis** - Intelligent analysis of data structure and field types
- **Interactive visualizations** - Automatic generation of charts based on your data:
  - Bar charts for categorical data
  - Histograms for numerical distributions
  - Scatter plots for correlations
  - Line charts for trends
  - Statistical summaries
- **Field analysis** - Detailed statistics for numerical, categorical, and date fields
- **Sample data** - Built-in sample dataset to explore features
- **Responsive design** - Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd json-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Paste JSON Data**: In the left panel, paste your JSON data or click "Sample Data" to load example data
2. **View Insights**: The right panel will automatically update with:
   - Data summary (total records, data type, structure depth)
   - Field analysis (statistics for numerical, categorical, and date fields)
   - Interactive visualizations
   - Raw data preview

### Supported Data Formats

The dashboard works best with:

- **Array of objects**: `[{name: "John", age: 30}, {name: "Jane", age: 25}]`
- **Objects with nested data**: `{users: [...], sales: [...]}`
- **Mixed data types**: Numbers, strings, dates, booleans

### Sample Data Structure

Click the "Sample Data" button to load an example dataset that includes:
- User records with demographics and salary data
- Sales data with revenue and expenses by month
- Metadata information

## Chart Types

The dashboard automatically generates appropriate visualizations:

- **Bar Charts**: For categorical data (city distribution, department counts, etc.)
- **Histograms**: For numerical data distributions (age, salary, revenue)
- **Scatter Plots**: For correlations between numerical fields
- **Line Charts**: For time series or sequential data
- **Statistical Cards**: Min, max, average, and count for numerical fields

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling and responsive design
- **Recharts** - Data visualization library
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/
│   ├── JsonInputPanel.jsx     # JSON input and validation
│   ├── InsightsPanel.jsx      # Main insights container
│   ├── DataSummary.jsx        # Data overview and statistics
│   ├── FieldAnalysis.jsx      # Detailed field analysis
│   └── ChartComponent.jsx     # Chart rendering
├── utils/
│   └── dataAnalyzer.js        # Data analysis and visualization logic
├── App.jsx                    # Main application component
└── main.jsx                   # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
