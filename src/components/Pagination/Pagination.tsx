import React from 'react';
import Button from '../Button/Button';
import { PaginationProps } from './PaginationTypes';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <Button onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)}>
        Previous
      </Button>
      <span>Page {currentPage} of {totalPages}</span>
      <Button onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
