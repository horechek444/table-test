import React from "react";
import {tableHeadNames} from "../../utils/data";

const TableInput = ({handleInputChange, inputValue, validationMessage, isValid}) => {
  const handleType = (item) => {
    if (item === "id") {
      return "number";
    } else if (item === "firstName" || item === "lastName" || item === "phone") {
      return "text";
    } else {
      return "email";
    }
  }

  const handlePattern = (item) => {
    if (item === "id") {
      return "^\d\d\d?$";
    } else if (item === "firstName" || item === "lastName") {
      return "^[A-Za-z]+$";
    } else if (item === "phone") {
      return "^\(\d\d\d\)\d\d\d\-\d\d\d\d$";
    } else {
      return "^[^@]+@[^@.]+\.[^@]+$";
    }
  }

  return (
    <tr className="table__row">
      {tableHeadNames.map((item) =>
        (<td key={item} className="table__cell">
          <label>
            <input
              className={`input input__${item}`}
              name={item} type={handleType(item)}
              pattern={handlePattern(item)}
              onChange={handleInputChange}
              value={inputValue[item]}
              form="inputForm"
              required/>
            {!isValid && <span>{validationMessage}</span>}
          </label>
        </td>)
      )}
    </tr>
  );
};

export default TableInput;
