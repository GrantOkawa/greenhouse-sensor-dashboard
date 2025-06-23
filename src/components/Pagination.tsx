import React from "react";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

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
      </button>
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;