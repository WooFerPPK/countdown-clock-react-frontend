// ClocksList.js
import React, { useState } from 'react';
import RowButtonLiink from '../RowButtonLink/RowButtonLink';
import { ClocksListProps } from './ClocksListTypes';
import Pagination from '../Pagination/Pagination';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

const ClocksList: React.FC<ClocksListProps> = ({ clocks, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const totalPages = clocks ? Math.ceil(clocks.length / itemsPerPage) : 0;
  const currentClocks = clocks
    ? clocks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <>
      <div className='clocks'>
        {loading ? (
          <p>Clocks Loading</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : clocks?.length === 0 || clocks === null ? (
          <p>No Clocks available</p>
        ) : (
          <>
            <ul className='clock-list'>
              {currentClocks.map((clock, index) => (
                <li key={index}>
                  <RowButtonLiink to={`clock/${clock._id}`}>
                    {clock.description}
                  </RowButtonLiink>
                  <CountdownTimer endTime={clock.endTime} />
                </li>
              ))}
            </ul>
            
            {clocks.length >= itemsPerPage ? (
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage} 
                /> 
            ) : ''}
          </>
        )}
      </div>
    </>
  );
};

export default ClocksList;
