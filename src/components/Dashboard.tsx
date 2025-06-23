import React, { useState, useEffect, useMemo, useCallback } from "react";
import { SensorData, Filters, SortOrder } from "../types/";
import { SimulateRealTimeData } from "../services/dataSimulator";
import Header from "./Header";
import FilterControls from "./FilterControls";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import SummaryCard from "./SummaryCard";

const ITEMS_PER_PAGE = 15; //Items shown per page
const MAX_DATA_POINTS = 5000; //Maximum data points to store in memory
const SENSOR_COUNT = 50; //Number of sensors to simulate
const UPDATE_INTERVAL = 2000; //Update interval in milliseconds (every 2 seconds)

// Initial filter values for temperature, humidity, and air quality
const INITIAL_FILTERS: Filters = {
  temperature: { min: 10, max: 40 },
  humidity: { min: 30, max: 90 },
  airQuality: { min: 0, max: 200 },
};

const Dashboard = () => {
  const [allData, setAllData] = useState<SensorData[]>([]); // State to hold all sensor data
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS); // State to hold current filters
  const [currentPage, setCurrentPage] = useState(1); // State to hold current page number
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc"); // Stores sort direction (asc or desc)

  // Memoized filter function for better performance
  // Checks if a given sensor data point is within the specified filters
  const isDataWithinFilters = useCallback(
    (data: SensorData, filters: Filters): boolean => {
      return (
        data.temperature >= filters.temperature.min &&
        data.temperature <= filters.temperature.max &&
        data.humidity >= filters.humidity.min &&
        data.humidity <= filters.humidity.max &&
        data.airQuality >= filters.airQuality.min &&
        data.airQuality <= filters.airQuality.max
      );
    },
    []
  );

  // Memoized sort function
  const sortDataByTimestamp = useCallback(
    (data: SensorData[], order: SortOrder): SensorData[] => {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime(); // Convert timestamp to milliseconds
        const dateB = new Date(b.timestamp).getTime(); // Convert timestamp to milliseconds

        // Handle invalid dates
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;

        return order === "asc" ? dateA - dateB : dateB - dateA; // Sort in ascending or descending order
      });
    },
    []
  );

  // Data simulation effect
  useEffect(() => {
    // Function to handle new data updates from the simulation
    const handleDataUpdate = (newUpdates: SensorData[]) => {
      if (!Array.isArray(newUpdates) || newUpdates.length === 0) {
        console.warn("Received invalid or empty update from simulation.");
        return;
      }

      // New data is added to the beginning of the array, keep the total under MAX_DATA_POINTS
      setAllData((prevData) => {
        const combined = [...newUpdates, ...prevData];
        return combined.slice(0, MAX_DATA_POINTS);
      });
    };

    // Start the simulation with the specified number of sensors and update interval
    const stopSimulation = SimulateRealTimeData(
      SENSOR_COUNT,
      UPDATE_INTERVAL,
      handleDataUpdate
    );
    return () => stopSimulation();
  }, []);

  // Filtered data computation based on current filters
  const filteredData = useMemo(() => {
    return allData.filter((data) => isDataWithinFilters(data, filters));
  }, [allData, filters, isDataWithinFilters]);

  // Summary statistics computation
  const summaryStats = useMemo(() => {
    if (filteredData.length === 0) {
      return { avgTemp: 0, avgHumidity: 0, avgAqi: 0 };
    }

    // Calculate totals for temperature, humidity, and air quality index (AQI)
    const totals = filteredData.reduce(
      (acc, data) => {
        acc.temp += data.temperature;
        acc.humidity += data.humidity;
        acc.aqi += data.airQuality;
        return acc;
      },
      { temp: 0, humidity: 0, aqi: 0 }
    );

    return {
      avgTemp: totals.temp / filteredData.length,
      avgHumidity: totals.humidity / filteredData.length,
      avgAqi: totals.aqi / filteredData.length,
    };
  }, [filteredData]);

  // Sorted data computation by timestamp and current sort order
  const sortedData = useMemo(() => {
    return sortDataByTimestamp(filteredData, sortOrder);
  }, [filteredData, sortOrder, sortDataByTimestamp]);

  // Pagination computes how many pages are needed based on how many items are sorted and how many go on each page
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedData.length / ITEMS_PER_PAGE));
  }, [sortedData.length]);

  //Picks out items for just the current page
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  // Event handlers
  // Updates the filters and resets to page 1
  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  //Handles pagination when the user clicks to change the page
  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  //Toggles the sort order and resets to page 1
  const handleSortToggle = useCallback(() => {
    setSortOrder((currentOrder) => (currentOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  }, []);

  //Resests filters to defaults
  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <Header dataLength={allData.length} />{" "}
        {/* Displays total number of sensor readings*/}
        <FilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          sortOrder={sortOrder}
          onSortToggle={handleSortToggle}
          onReset={handleResetFilters}
        />{" "}
        {/* UI controls for filtering and sorting */}
        <SummaryCard stats={summaryStats} /> {/*Displays average stats */}
        <DataTable data={paginatedData} />{" "}
        {/*Displays sensor data in table format*/}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />{" "}
        {/* Page navigation controls */}
      </div>
    </div>
  );
};

export default Dashboard;