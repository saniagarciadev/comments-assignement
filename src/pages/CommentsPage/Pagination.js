import React, { useState, useEffect } from "react";
import { getNumberOfPages } from "../../services/comments-api";
import "./Pagination.css";

export default function Pagination() {
  const [paginationButtons, setPaginationButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const getNumsToDisplay = async (pageNumber, numberOfPages) => {
    let numsToDisplay = [];
    if (pageNumber === 1) {
      for (let i = 1; i <= numberOfPages; i++) {
        if (numsToDisplay.length === 3) {
          break;
        } else {
          numsToDisplay.push(i);
        }
      }
    } else if (pageNumber === numberOfPages) {
      for (let i = numberOfPages; i <= numberOfPages; i--) {
        if (numsToDisplay.length === 3) {
          break;
        } else {
          numsToDisplay.push(i);
        }
      }
      return numsToDisplay.reverse();
    } else {
      numsToDisplay = [pageNumber - 1, pageNumber, pageNumber + 1];
    }
    return numsToDisplay;
  };

  const displayPagination = async (pageNumber) => {
    let buttons = [1];
    const numberOfPages = await getNumberOfPages();
    setLastPage(numberOfPages);
    let numsToDisplay = await getNumsToDisplay(pageNumber, numberOfPages);
    numsToDisplay &&
      numsToDisplay.forEach(
        (n) => n !== 1 && n !== numberOfPages && buttons.push(n)
      );
    numberOfPages > 1 && buttons.push(numberOfPages);
    numsToDisplay[0] > 2 && buttons.splice(1, 0, "...");
    numsToDisplay[2] < numberOfPages - 1 &&
      buttons.splice(buttons.length - 1, 0, "...");
    setPaginationButtons(buttons);
  };

  useEffect(() => {
    displayPagination(currentPage);
  }, [currentPage]);

  return (
    <ul className="Pagination">
      <li
        onClick={() =>
          currentPage !== 1 && setCurrentPage((prev) => prev > 1 && prev - 1)
        }
      >
        {"<"}
      </li>
      {paginationButtons &&
        paginationButtons.map((pageNumber, index) => (
          <li
            onClick={() => setCurrentPage(pageNumber)}
            key={index}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </li>
        ))}
      <li
        onClick={() =>
          currentPage !== lastPage &&
          setCurrentPage((prev) => {
            return prev + 1;
          })
        }
      >
        {">"}
      </li>
    </ul>
  );
}
