import { SensorData } from "../types";

// This function simulates real-time data updates from multiple sensors.
export const SimulateRealTimeData = (
  sensorCount: number, // Number of sensors to simulate
  interval: number, // Update interval in milliseconds
  onUpdate: (updates: SensorData[]) => void // Callback to handle new data updates
) => {
  // Function to generate random sensor data, returns a single SensorData object
  const generateMetrics = (sensorId: string): SensorData => ({
    sensorId: sensorId,
    timestamp: new Date().toISOString(),
    airQuality: +(Math.random() * 200).toFixed(2), // 0-200 AQI
    temperature: +(10 + Math.random() * 30).toFixed(2), // 10-40°C
    humidity: +(30 + Math.random() * 60).toFixed(2), // 30-90% 
  });

  // Function to generate and send updates
  const intervalId = setInterval(() => {
    const updates = Array.from({ length: sensorCount }, (_, i) =>
      generateMetrics(`Sensor-${i + 1}`)
    );
    onUpdate(updates);
  }, interval);

  return () => clearInterval(intervalId); //Stop the time, ending the simulation
};