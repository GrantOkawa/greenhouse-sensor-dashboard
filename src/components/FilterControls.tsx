import { Filters } from "../types";
import { SortOrder } from "../types";
import "../styles/FilterControls.css"; 

// FilterControls component for managing filter inputs and sort order
const FilterControls = ({ 
  filters, 
  onFilterChange, 
  sortOrder, 
  onSortToggle, 
  onReset 
}: {
  filters: Filters; // Current filter values
  onFilterChange: (filters: Filters) => void; // Function to update filters
  sortOrder: SortOrder; // Current sort order
  onSortToggle: () => void; // Function to toggle sort order
  onReset: () => void; // Function to reset filters
}) => {
  const handleInputChange = (
    category: keyof Filters, // (temperature, humidity, airQuality)
    type: "min" | "max",
    value: string
  ) => {
    // Convert input value to a number and calls onFilterChange with updated filters
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      onFilterChange({
        ...filters,
        [category]: {
          ...filters[category],
          [type]: numericValue,
        },
      });
    }
  };

  // Slider component for each filter category
  const FilterSlider = ({ 
    label, 
    category, 
    min, 
    max, 
    step, 
    unit 
  }: {
    label: string;
    category: keyof Filters;
    min: number;
    max: number;
    step: number;
    unit: string;
  }) => (
    <div className="filter-slider-container">
      <label className="filter-label text-green-100">{label} Range</label>{" "}
      {/*Label for the slider */}
      <div className="slider-container">
        <span className="slider-value">
          {filters[category].min.toFixed(1)}
          {unit}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={filters[category].min}
          onChange={(e) => handleInputChange(category, "min", e.target.value)}
          className="slider"
          aria-label={`${label} min value`}
        />
      </div>{" "}
      {/* Slider for setting the minimum value*/}
      <div className="slider-container">
        <span className="slider-value">
          {filters[category].max.toFixed(1)}
          {unit}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={filters[category].max}
          onChange={(e) => handleInputChange(category, "max", e.target.value)}
          className="slider"
          aria-label={`${label} max value`}
        />
      </div>{" "}
      {/* Slider for setting the maximum value*/}
    </div>
  );

  return (
    <div className="filter-controls bg-white-10 backdrop-blur-sm border border-white-20 shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="filter-title">Controls</h3>
        <div className="flex items-center gap-2">
          <button onClick={onReset} className="sort-button">
            Reset
          </button>{" "}
          {/* Button to reset filters*/}
          <button
            onClick={onSortToggle}
            className="sort-button"
            aria-label={`Sort by timestamp: ${
              sortOrder === "desc" ? "Ascending" : "Descending"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="sort-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9M3 12h9m-9 4h13m0-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>
              {sortOrder === "desc" ? "Ascending" : "Descending"}
            </span>
          </button>{" "}
          {/* Button to toggle sort order */}
        </div>
      </div>
      {/* Three sliders temp, humidity, aqi */}
      <div className="grid grid-cols-1 filter-grid gap-4">
        <FilterSlider
          label="Temperature"
          category="temperature"
          min={10}
          max={40}
          step={0.5}
          unit="°C"
        />
        <FilterSlider
          label="Humidity"
          category="humidity"
          min={30}
          max={90}
          step={1}
          unit="%"
        />
        <FilterSlider
          label="Air Quality"
          category="airQuality"
          min={0}
          max={200}
          step={5}
          unit=" AQI"
        />
      </div>
    </div>
  );
};

export default FilterControls;