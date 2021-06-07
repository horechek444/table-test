import React from "react";
import {tableHeadNames} from "../../utils/data";

const TableBody = ({sortedProducts, setSelectedUser}) => {
  return (
    sortedProducts.map((item) => (
      <tr key={item.email} className="table__row" onClick={() => setSelectedUser(item)}>
        {tableHeadNames.map((name) =>
          (<td key={name} className="table__cell">
            {item[name]}
          </td>)
        )}
      </tr>
    ))
  );
};

export default TableBody;
