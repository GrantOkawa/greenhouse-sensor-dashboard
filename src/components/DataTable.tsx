import React, { memo } from "react";
import { SensorData } from "../types";
import "../styles/DataTable.css"; 

//Converts ISO timestamp to a human-readable format
const formatTimestamp = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Invalid Date";
  }
};

// Returns the appropriate color class based on the metric value and type (temp, humidity, aqi)
const getMetricColor = (
  value: number,
  type: "temp" | "humidity" | "aqi"
): string => {
  const colorRanges = {
    temp: {
      good: { min: 20, max: 26 },
      warning: { min: 18, max: 30 },
      critical: { min: 0, max: 100 },
    },
    humidity: {
      good: { min: 50, max: 70 },
      warning: { min: 40, max: 80 },
      critical: { min: 0, max: 100 },
    },
    aqi: {
      good: { min: 0, max: 50 },
      warning: { min: 51, max: 100 },
      moderate: { min: 101, max: 150 },
      critical: { min: 151, max: 500 },
    },
  };

  // For AQI, more specific ranges
  if (type === "aqi") {
    if (value <= colorRanges.aqi.good.max) return "text-green-400";
    if (value <= colorRanges.aqi.warning.max) return "text-yellow-300";
    if (value <= colorRanges.aqi.moderate.max) return "text-orange-300";
    return "text-red-400";
  }

  // For temperature and humidity
  const range = colorRanges[type];
  if (value >= range.good.min && value <= range.good.max)
    return "text-green-400";
  if (value >= range.warning.min && value <= range.warning.max)
    return "text-yellow-300";
  return "text-orange-300";
};

//A single table row that displays sensor data, wrapped in memo to avoid unnecessary re-renders
const TableRow = memo<{ data: SensorData }>(({ data }) => (
  <tr className="table-row border-b border-white-10 hover:bg-white-5">
    <td className="table-cell font-mono">{formatTimestamp(data.timestamp)}</td>{" "}
    <td className="table-cell">{data.sensorId}</td>
    <td
      className={`table-cell text-right font-semibold ${getMetricColor(
        data.temperature,
        "temp"
      )}`}
    >
      {data.temperature.toFixed(2)} °C
    </td>{" "}
    <td
      className={`table-cell text-right font-semibold ${getMetricColor(
        data.humidity,
        "humidity"
      )}`}
    >
      {data.humidity.toFixed(2)} %
    </td>{" "}
    <td
      className={`table-cell text-right font-semibold ${getMetricColor(
        data.airQuality,
        "aqi"
      )}`}
    >
      {data.airQuality.toFixed(0)}
    </td>{" "}
  </tr>
));

// A mobile-friendly card component that displays sensor data
const MobileCard = memo<{ data: SensorData }>(({ data }) => (
  <div className="mobile-card bg-white-10 border border-white-20">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-white">{data.sensorId}</span>{" "}
      {/*Sensor ID */}
      <span className="text-sm text-gray-300 font-mono">
        {formatTimestamp(data.timestamp)}
      </span>{" "}
    </div>
    <div className="mobile-data-grid">
      <div>
        <p className="metric-label">Temp</p>
        <p
          className={`metric-value ${getMetricColor(data.temperature, "temp")}`}
        >
          {data.temperature.toFixed(1)}°
        </p>{" "}
        {/*Temperature */}
      </div>
      <div>
        <p className="metric-label">Humidity</p>
        <p
          className={`metric-value ${getMetricColor(
            data.humidity,
            "humidity"
          )}`}
        >
          {data.humidity.toFixed(1)}%
        </p>{" "}
        {/* Humidity*/}
      </div>
      <div>
        <p className="metric-label">AQI</p>
        <p className={`metric-value ${getMetricColor(data.airQuality, "aqi")}`}>
          {data.airQuality.toFixed(0)}
        </p>{" "}
        {/*Air Quality Index */}
      </div>
    </div>
  </div>
));

//Shows an empty state when no data is available, user filtered out all data
const EmptyState = () => (
  <div className="no-data-container bg-white-5 rounded-lg">
    <p className="text-white">No data matches the current filters.</p>
    <p className="text-white">Try adjusting the filter ranges.</p>
  </div>
);

// Main DataTable component
const DataTable: React.FC<{ data: SensorData[] }> = memo(({ data }) => {
  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="data-table-container bg-white-10 backdrop-blur-sm rounded-xl shadow-lg border border-white-20 overflow-hidden">
      {/*Desktop Table View*/}
      <div className="desktop-only">
        <table className="table">
          <thead className="table-header text-xs text-white uppercase">
            <tr>
              <th scope="col" className="table-header-cell">
                Timestamp
              </th>
              <th scope="col" className="table-header-cell">
                Sensor ID
              </th>
              <th scope="col" className="table-header-cell text-right">
                Temperature
              </th>
              <th scope="col" className="table-header-cell text-right">
                Humidity
              </th>
              <th scope="col" className="table-header-cell text-right">
                Air Quality
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <TableRow
                key={`${item.sensorId}-${item.timestamp}`}
                data={item}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-only p-4 space-y-4">
        {data.map((item) => (
          <MobileCard key={`${item.sensorId}-${item.timestamp}`} data={item} />
        ))}
      </div>
    </div>
  );
});

export default DataTable;