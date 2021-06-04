import React from "react";
import {tableHeadNames} from "../../utils/data";
import "./TableHead.css";
import Arrow from "../arrow/Arrow";

const TableHead = ({sortConfig, requestSort}) => {
  return (
    <tr className="table__row">
      {tableHeadNames.map((item) =>
        (<th key={item} className="table__head table__cell head">
          <span className="head__cover" onClick={() => requestSort(item)}>
            {item}
            <Arrow sortConfig={sortConfig} item={item} />
          </span>
        </th>)
      )}
    </tr>
  );
};

export default TableHead;
