import React from 'react';

// Structure of the data used for summary statistics
interface SummaryStats {
  avgTemp: number;
  avgHumidity: number;
  avgAqi: number;
}

// SummaryCard component to display average temperature, humidity, and AQI
// Props: stats - an object containing average temperature, humidity, and AQI
const SummaryCard: React.FC<{ stats: SummaryStats }> = ({ stats }) => (
  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
    <div className="bg-white-10 p-4 rounded-xl">
      <p className="text-green-200 text-sm">Avg. Temp</p>
      <p className="text-2xl font-bold">{stats.avgTemp.toFixed(1)}°C</p>
    </div> // Card for average temperature
    <div className="bg-white-10 p-4 rounded-xl">
      <p className="text-green-200 text-sm">Avg. Humidity</p>
      <p className="text-2xl font-bold">{stats.avgHumidity.toFixed(1)}%</p>
    </div> // Card for average humidity
    <div className="bg-white-10 p-4 rounded-xl">
      <p className="text-green-200 text-sm">Avg. AQI</p>
      <p className="text-2xl font-bold">{stats.avgAqi.toFixed(0)}</p>
    </div> // Card for average AQI
  </div>
);

export default SummaryCard;