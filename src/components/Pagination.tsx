import "../styles/Pagination.css"; 

// Pagination component for navigating through pages of data
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: {
  currentPage: number; // Current page number
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Function to handle page change
}) => {
  if (totalPages <= 1) return null;

  // Goes back to the previous page if not on the first page
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  // Goes forward to the next page if not on the last page
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav className="pagination text-white" aria-label="Pagination">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>{" "}
      {/* Button to go to the previous page */}
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>{" "}
      {/* Display current page and total pages */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>{" "}
      {/* Button to go to the next page */}
    </nav>
  );
};

export default Pagination;