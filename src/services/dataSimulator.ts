// src/services/dataSimulator.ts
import { SensorData } from "../types";

// This function simulates real-time data updates from multiple sensors.
export const SimulateRealTimeData = (
  sensorCount: number,
  interval: number,
  onUpdate: (updates: SensorData[]) => void
) => {
  const generateMetrics = (sensorId: string): SensorData => ({
    sensorId: sensorId,
    timestamp: new Date().toISOString(),
    airQuality: +(Math.random() * 200).toFixed(2), // 0-200 AQI
    temperature: +(10 + Math.random() * 30).toFixed(2), // 10-40°C
    humidity: +(30 + Math.random() * 60).toFixed(2), // 30-90% RH
  });

  const intervalId = setInterval(() => {
    const updates = Array.from({ length: sensorCount }, (_, i) =>
      generateMetrics(`Sensor-${i + 1}`)
    );
    onUpdate(updates);
  }, interval);

  return () => clearInterval(intervalId);
};