🌱 Real-Time Sensor Dashboard 🌱
This project is a responsive and performant dashboard for visualizing real-time sensor data, built with React and TypeScript.

🚀 CHECK IT OUT AT: https://greenhouse-sensor-dashboard.vercel.app/

Features
- Real-Time Data Updates: Simulates a live data feed with new sensor readings every 2 seconds.
- Data Filtering: Filter data by temperature, humidity, and air quality using interactive sliders.
- Data Sorting: Sort data by timestamp in ascending or descending order.
- Pagination: Efficiently navigate through large datasets with paginated views.
- Responsive Design: A fluid layout that provides an optimal viewing experience on both desktop and mobile devices.
- Color-Coded Metrics: At-a-glance insights into data with color-coded values for different metric ranges.

Project Structure
The project is organized into a clean and maintainable component-based architecture:
- src/components: Contains all the React components, each responsible for a specific part of the UI.
  - Dashboard.tsx: The main component that manages state and data flow.
  - Header.tsx: Displays the dashboard title and live data status.
  - FilterControls.tsx: Provides controls for filtering and sorting.
  - DataTable.tsx: Renders the data in a table or card view.
  - Pagination.tsx: Handles page navigation.
- src/services: Includes the dataSimulator.ts for generating mock sensor data.
- src/types: Defines TypeScript interfaces and types for data consistency.

Performance Analysis
Performance is a core focus of this application. The following optimizations have been implemented to ensure a smooth and responsive user experience:
- Update Speed: The dashboard updates every 2 seconds. Thanks to efficient memoization, the UI remains fluid even with a high frequency of updates.
- Memory Management: The total number of data points is capped at 5000 to prevent excessive memory consumption and ensure long-term stability.
- Component Memoization: useMemo, useCallback, and React.memo are used extensively to prevent unnecessary re-renders and expensive computations, leading to a highly optimized rendering process. This ensures that UI updates are fast and efficient, even as new data streams in.

Getting Started
To run the project locally, clone the repository and run the following commands:
- npm install
- npm start
