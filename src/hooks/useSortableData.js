import React, {useMemo, useState} from "react";

const useSortableData = (data, config = { key: 0, direction: 0 }) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...data];
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
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  }

  return {sortedProducts, requestSort, sortConfig};
};

export default useSortableData;
