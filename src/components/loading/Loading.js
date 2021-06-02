import React from "react";
import "./Loading.css"

const Loading = ({loading}) => {
  return (
    <span className={loading ? "loading loading_active" : "loading"}>Данные загружаются...</span>
  );
};

export default Loading;
