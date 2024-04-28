"use cleint";

import React, { useEffect, useMemo, useRef, useState } from "react";

const Pagination = ({ handlePageData, peopleData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const sortedPeopleData = useMemo(() => {
    return peopleData.slice().sort((b, a) => a.nr - b.nr);
  }, [peopleData]);

  const totalPages = Math.ceil(sortedPeopleData.length / itemsPerPage);
  const pagesToShow = 3;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const prevItemsRef = useRef(
    sortedPeopleData.slice(indexOfFirstItem, indexOfLastItem)
  );

  const currentItems = useMemo(() => {
    return sortedPeopleData.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedPeopleData, indexOfFirstItem, indexOfLastItem]);

  useEffect(() => {
    const prevItems = prevItemsRef.current;
    if (prevItems !== currentItems) {
      handlePageData(currentItems);
      prevItemsRef.current = currentItems;
    }
  }, [currentItems, handlePageData]);

  const handleItemsPerPageChange = (e) => {
    setCurrentPage(1);
    setItemsPerPage(parseInt(e.target.value));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination flex gap-2 justify-center items-center pb-2">
      <div className="hidden md:flex items-center gap-1">
        {currentPage > 2 && (
          <>
            <button
              key={0}
              className={`border border-gray-300 bg-white text-gray-700 rounded-full px-3 py-1 
              }`}
              onClick={() => handlePageClick(1)}
            >
              1
            </button>
            {currentPage > 3 && totalPages >= 4 && (
              <span className="text-gray-500">...</span>
            )}
          </>
        )}

        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;

          if (pageNumber >= startPage && pageNumber <= endPage) {
            const isCurrentPage = pageNumber === currentPage;

            return (
              <button
                key={`page-${pageNumber}`}
                className={`border border-gray-300 bg-white text-gray-700 rounded-full px-3 py-1 ${
                  isCurrentPage ? "border-blue-500 font-bold text-blue-500" : ""
                }`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          }

          return null;
        })}

        {currentPage < totalPages - 2 && totalPages > 4 && (
          <>
            <span className="text-gray-500">...</span>
            <button
              key={totalPages}
              className={`border border-gray-300 bg-white text-gray-700 rounded-full px-3 py-1`}
              onClick={() => handlePageClick(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        {(currentPage === totalPages - 2 ||
          (totalPages === 4 && currentPage === 1)) &&
          totalPages > 3 && (
            <button
              key={totalPages}
              className={`border border-gray-300 bg-white text-gray-700 rounded-full px-3 py-1 `}
              onClick={() => handlePageClick(totalPages)}
            >
              {totalPages}
            </button>
          )}
      </div>
      <div>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border border-gray-300 rounded-md px-3 py-[6px] text-gray-700 bg-white "
        >
          {[5, 10, 15, 20, 25, 30, 35, 40].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
