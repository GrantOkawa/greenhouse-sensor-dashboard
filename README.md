Greenhouse Dashboard
A real-time React dashboard for monitoring greenhouse sensor data with advanced filtering, sorting, and responsive design.

CHECK IT OUT AT: https://greenhouse-sensor-dashboard.vercel.app/

🌱 Features
- Real-time Data Monitoring: Live updates from 50+ sensors every 2 seconds
- Advanced Filtering: Range-based filters for temperature, humidity, and air quality
- Responsive Design: Optimized for desktop and mobile devices
- Performance Optimized: Handles 5000+ data points with smooth interactions
- Color-coded Metrics: Visual indicators for optimal greenhouse conditions
- Sorting & Pagination: Flexible data organization and navigation
- Accessibility: Full ARIA support and keyboard navigation

🚀 Quick Start

Prerequisites
-Node.js 18+
- npm or yarn
- Modern web browser

Installation
# Clone the repository
git clone https://github.com/your-username/greenhouse-dashboard.git

# Navigate to project directory
cd greenhouse-dashboard

# Install dependencies
npm install

# Start development server
npm start

Project Structure

The project is organized as follows:
src/
components/              # React components
- Dashboard.tsx       # Main container component
- DataTable.tsx       # Data display component
- FilterControls.tsx  # Filter and sort controls
- Header.tsx          # Application header
- Pagination.tsx      # Pagination controls

services/               
- dataSimulator.ts    # Real-time data simulation
  
- types/                  
- index.ts            # TypeScript interfaces
                
- index.css           # CSS styles

Key Components
Dashboard.tsx
The main orchestrator component that manages:
- Application state (data, filters, pagination)
- Real-time data subscription
- Performance optimization through memoization
- Event handling coordination

DataTable.tsx
Responsive data presentation component featuring:
- Desktop table view with sortable columns
- Mobile card view for smaller screens
- Color-coded metrics based on optimal ranges
- Memoized rendering for performance

FilterControls.tsx
Interactive control panel providing:
- Range sliders for temperature, humidity, and air quality
- Sort order toggle (newest/oldest first)
- Real-time filter updates
- Responsive grid layout

dataSimulator.ts
Realistic sensor data simulation with:
- Configurable sensor count and update intervals
- Greenhouse-appropriate data ranges
- Clean memory management

🎯 Performance Analysis
Key Metrics

Performance Optimizations
1. Memoization Strategy
- React.memo for component-level memoization
- useMemo for expensive calculations (filtering, sorting)
- useCallback for event handlers

2. Data Management
- Automatic data pruning (5000 record limit)
- Efficient array operations
- Batched state updates

3. Rendering Optimization
- Selective re-renders
- Memoized table rows
- Responsive CSS (no JavaScript media queries)

🔧Customization Options

Data Ranges
Modify dataSimulator.ts to adjust sensor value ranges:
- temperature: (15 + Math.random() * 25).toFixed(2) // 15-40°C
- humidity: (40 + Math.random() * 40).toFixed(2) // 40-80%
- airQuality: (Math.random() * 150).toFixed(2) // 0-150 AQI

Filter Defaults
Update Dashboard.tsx initial filters:
The initial filter settings are defined as follows:
- temperature: { min: 15, max: 35 }
- humidity: { min: 40, max: 80 }
- airQuality: { min: 0, max: 150 }

🎨 Styling & Theming
The application uses Tailwind CSS with custom utility classes:

Color Scheme
- Primary: Green theme (emerald-500, green-400)
- Background: Dark with glassmorphism effects
- Text: White/gray scale for contrast
- Metrics: Color-coded based on optimal ranges

Responsive Breakpoints
- Mobile: < 768px (card view)
- Desktop: ≥ 768px (table view)
- Large: ≥ 1024px (expanded layout)

Custom CSS classes for responsive design are defined in index.css
