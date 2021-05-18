import React, {useState} from "react";
import tableHeadNames from "../../utils/data";
import "./tableHead.css";
import arrow from "../../images/arrow.svg";

const TableHead = () => {
  const [sortedField, setSortedField] = React.useState(null);

  const handleSort = (field) => {
    setSortedField(field);
  }

  return (
    <tr className="table__row">
      {tableHeadNames.map((item) =>
        (<th key={item} className="table__head table__cell head">
          <span className="head__cover" onClick={() => handleSort(item)}>
            {item}
            <img
              className={sortedField === item ? "head__arrow head__arrow_open" : "head__arrow"}
              src={arrow} alt="сортировка"
            />
          </span>
        </th>)
      )}
    </tr>
  );
};

export default TableHead;
