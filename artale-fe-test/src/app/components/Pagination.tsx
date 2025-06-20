"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handleFirst = () => onPageChange(1);
  const handlePrevious = () => onPageChange(currentPage - 1);
  const handleNext = () => onPageChange(currentPage + 1);
  const handleLast = () => onPageChange(totalPages);

  const buttonClass =
    "px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={handleFirst}
        disabled={currentPage === 1}
        className={buttonClass}
        aria-label="첫 페이지로 이동"
      >
        &laquo;
      </button>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={buttonClass}
      >
        이전
      </button>
      <span className="text-sm text-gray-700 px-2">
        페이지 {currentPage} / {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={buttonClass}
      >
        다음
      </button>
      <button
        onClick={handleLast}
        disabled={currentPage === totalPages}
        className={buttonClass}
        aria-label="마지막 페이지로 이동"
      >
        &raquo;
      </button>
    </div>
  );
}
