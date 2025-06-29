// Defines the structure for a single sensor data point.
export interface SensorData {
  sensorId: string;
  timestamp: string;
  airQuality: number; // AQI
  temperature: number; // °C
  humidity: number; // % 
}

// Defines the structure for the filter settings.
export interface Filters {
  temperature: { min: number; max: number };
  humidity: { min: number; max: number };
  airQuality: { min: number; max: number };
}

// Defines the possible sort orders.
export type SortOrder = "asc" | "desc";