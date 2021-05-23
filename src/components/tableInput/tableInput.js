import React from "react";
import {tableHeadNames} from "../../utils/data";

const TableInput = () => {
  const handleType = (item) => {
    if (item === "id") {
      return "number";
    } else if (item === "firstName" || item === "lastName" || item === "phone") {
      return "text";
    } else {
      return "email";
    }
  }

  return (
    <tr className="table__row">
      {tableHeadNames.map((item) =>
        (<td key={item} className="table__cell">
          <input className={`input input__${item}`} name={item} type={handleType(item)} required />
        </td>)
      )}
    </tr>
  );
};

export default TableInput;
