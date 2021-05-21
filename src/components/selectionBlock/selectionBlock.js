import React from "react";
import "./selectionBlock.css";

const SelectionBlock = ({children}) => {
  return (
    <div className="data-selection">
      <h2 className="data-selection__title">Выбрать размер набора данных:</h2>
      <div className="data-selection__cover">
        {children}
      </div>
    </div>
  );
};

export default SelectionBlock;
