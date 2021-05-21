import React from "react";
import "./buttonSelect.css";
import {URL_BIG, URL_SMALL} from "../../utils/data";

const ButtonSelect = ({name, setUrl}) => {
  return (
    <button className="button button__select button__margin" onClick={() => setUrl((name === 'Много') ? URL_BIG :  URL_SMALL)}>{name} данных</button>
  );
};

export default ButtonSelect;
