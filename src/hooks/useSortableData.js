import {useMemo, useState} from "react";
import {NOTES_ON_PAGE} from "../utils/data";

const useSortableData = (data, config = {key: 0, direction: 0}) => {
  const [sortConfig, setSortConfig] = useState(config);
  const [currentPage, setCurrentPage] = useState(1);

  let firstLimit = (currentPage - 1) * NOTES_ON_PAGE;
  let secondLimit = firstLimit + NOTES_ON_PAGE;

  let sortableProducts = [...data].slice(firstLimit, secondLimit);

  const sortedProducts = useMemo(() => {
    if (sortConfig !== { key: 0, direction: 0 }) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [sortConfig, sortableProducts]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  }

  return {sortedProducts, requestSort, sortConfig, currentPage, setCurrentPage};
};

export default useSortableData;
