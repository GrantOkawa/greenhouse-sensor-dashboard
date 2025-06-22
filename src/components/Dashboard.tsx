import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SensorData, Filters, SortOrder } from '../types/';
import { SimulateRealTimeData } from '../services/dataSimulator';
import Header from './Header';
import FilterControls from './FilterControls';
import DataTable from './DataTable';
import Pagination from './Pagination';

// Constants moved to top for better maintainability
const ITEMS_PER_PAGE = 15;
const MAX_DATA_POINTS = 5000;
const SENSOR_COUNT = 50;
const UPDATE_INTERVAL = 2000;

const INITIAL_FILTERS: Filters = {
  temperature: { min: 10, max: 40 },
  humidity: { min: 30, max: 90 },
  airQuality: { min: 0, max: 200 },
};

const Dashboard = () => {
  const [allData, setAllData] = useState<SensorData[]>([]);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Memoized filter function for better performance
  const isDataWithinFilters = useCallback((data: SensorData, filters: Filters): boolean => {
    return (
      data.temperature >= filters.temperature.min && 
      data.temperature <= filters.temperature.max &&
      data.humidity >= filters.humidity.min && 
      data.humidity <= filters.humidity.max &&
      data.airQuality >= filters.airQuality.min && 
      data.airQuality <= filters.airQuality.max
    );
  }, []);

  // Memoized sort function
  const sortDataByTimestamp = useCallback((data: SensorData[], order: SortOrder): SensorData[] => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      
      // Handle invalid dates
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, []);

  // Data simulation effect
  useEffect(() => {
    const handleDataUpdate = (newUpdates: SensorData[]) => {
      if (!Array.isArray(newUpdates) || newUpdates.length === 0) {
        console.warn("Received invalid or empty update from simulation.");
        return;
      }
      
      setAllData(prevData => {
        const combined = [...newUpdates, ...prevData];
        return combined.slice(0, MAX_DATA_POINTS);
      });
    };

    const stopSimulation = SimulateRealTimeData(SENSOR_COUNT, UPDATE_INTERVAL, handleDataUpdate);
    return () => stopSimulation();
  }, []);

  // Filtered data computation
  const filteredData = useMemo(() => {
    return allData.filter(data => isDataWithinFilters(data, filters));
  }, [allData, filters, isDataWithinFilters]);

  // Sorted data computation
  const sortedData = useMemo(() => {
    return sortDataByTimestamp(filteredData, sortOrder);
  }, [filteredData, sortOrder, sortDataByTimestamp]);

  // Pagination calculations
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedData.length / ITEMS_PER_PAGE));
  }, [sortedData.length]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  // Event handlers
  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const handlePageChange = useCallback((page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const handleSortToggle = useCallback(() => {
    setSortOrder(currentOrder => (currentOrder === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1); // Reset to first page when sort changes
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <Header dataLength={allData.length} />
        <FilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          sortOrder={sortOrder}
          onSortToggle={handleSortToggle}
        />
        <DataTable data={paginatedData} />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default Dashboard;