import React from "react";
import "./ButtonAdd.css";

const ButtonAdd = ({type, name, onClick, disabled}) => {
  return (
    <button className="button button__add button__margin" type={type} onClick={onClick} disabled={disabled}>{name}</button>
  );
};

export default ButtonAdd;
