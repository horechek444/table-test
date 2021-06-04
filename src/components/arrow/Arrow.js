import React from "react";
import "./Arrow.css";
import arrow from "../../images/arrow.svg";

const Arrow = ({sortConfig, item}) => {
  return (
    <img
      className={(sortConfig.key === item && sortConfig.direction === "ascending") ?
        "head__arrow head__arrow_open" : "head__arrow"}
      src={arrow} alt="сортировка"
    />
  );
};

export default Arrow;
