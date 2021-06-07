import React from "react";
import {tableHeadNames} from "../../utils/data";

const TableInput = ({handleInputChange, inputValue, validationMessage, isValid}) => {
  const handleType = (item) => {
    if (item === "id") {
      return "number";
    } else if (item === "firstName" || item === "lastName") {
      return "text";
    } else if (item === "phone") {
      return "tel";
    } else {
      return "email";
    }
  }

  const handlePattern = (item) => {
    if (item === "id") {
      return "^[0-9]{2,3}$";
    } else if (item === "firstName" || item === "lastName") {
      return "^[A-Za-z]+$";
    } else if (item === "phone") {
      return "^[(][0-9]{3}[)][0-9]{3}-[0-9]{4}$";
    } else {
      return "^[^@]+@[^@.]+[^@]+$";
    }
  }

  return (
    <tr className="table__row">
      {tableHeadNames.map((item) =>
        (<td key={item} className="table__cell">
          <label>
            <input
              className={isValid ? `input input__${item}` : "input input__invalid"}
              name={item}
              type={handleType(item)}
              pattern={handlePattern(item)}
              onChange={handleInputChange}
              value={inputValue[item]}
              form="inputForm"
              required/>
            {!isValid && <span className="input__validation-message">{validationMessage}</span>}
          </label>
        </td>)
      )}
    </tr>
  );
};

export default TableInput;
