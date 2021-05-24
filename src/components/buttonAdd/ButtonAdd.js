import React from "react";
import "./ButtonAdd.css";

const ButtonAdd = ({type, name, onClick}) => {
  return (
    <button className="button button__add button__margin" type={type} onClick={onClick}>{name}</button>
  );
};

export default ButtonAdd;
