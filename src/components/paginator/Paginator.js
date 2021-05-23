import React, {useState} from "react";
import {TOTAL_ITEMS_COUNT, NOTES_ON_PAGE} from "../../utils/data";
import "./Paginator.css";

const Paginator = ({currentPage, handlePageChanged, portionSize = 3}) => {
  let [portionNumber, setPortionNumber] = useState(1);

  const pagesCount = Math.ceil(TOTAL_ITEMS_COUNT/NOTES_ON_PAGE);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount/portionSize);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className="paginator">
      {portionNumber > 1 && <button className="button paginator__button" onClick={() => setPortionNumber(portionNumber - 1)}>Previous</button>}

      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((page) =>
      (<span className={currentPage === page ? "paginator__page paginator__page_current" : "paginator__page"}
             key={page}
             onClick={() => handlePageChanged(page)}
      >
        {page}
      </span>
      )
    )}
      {portionCount > portionNumber && <button className="button paginator__button" onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
    </div>
  );
};

export default Paginator;
