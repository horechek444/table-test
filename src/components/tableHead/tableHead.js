import React from "react";
import tableHeadNames from "../../data";
import "./tableHead.css";

const TableHead = () => {
  return (
    <tr className="table__row">
      {tableHeadNames.map((item) =>
        (<th key={item} className="table__head table__cell">{item}</th>)
      )}
    </tr>
  );
};

export default TableHead;
