import React from "react";
import tableHeadNames from "../../utils/data";

const TableBody = () => {
  return (
    <tr className="table__row">
      {tableHeadNames.map((item) =>
        (<td key={item} className="table__cell">
          <input className={`input input__${item}`}/>
        </td>)
      )}
    </tr>
  );
};

export default TableBody;
