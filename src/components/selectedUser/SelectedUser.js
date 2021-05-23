import React from "react";
import "./SelectedUser.css";

const SelectedUser = ({selectedUser}) => {
  return (
    selectedUser && <div className="table__selected-row table__selected_margin">
      <span className="table__selected-paragraph">
        Выбран пользователь:&nbsp;
        <span className="table__selected-user">
          {selectedUser.firstName + " " + selectedUser.lastName}
        </span>
      </span>
      <span className="table__selected-paragraph">
        Описание:&nbsp;
        <span className="table__selected-user">
          {selectedUser.description}
        </span>
      </span>
      <span className="table__selected-paragraph">
        Адрес проживания:&nbsp;
        <span className="table__selected-user">
          {selectedUser.address.streetAddress}
        </span>
      </span>
      <span className="table__selected-paragraph">
        Город:&nbsp;
        <span className="table__selected-user">
          {selectedUser.address.city}
        </span>
      </span>
      <span className="table__selected-paragraph">
        Провинция/штат:&nbsp;
        <span className="table__selected-user">
        {selectedUser.address.state}
        </span>
      </span>
      <span className="table__selected-paragraph">
        Индекс:&nbsp;
        <span className="table__selected-user">
          {selectedUser.address.zip}
        </span>
      </span>
    </div>
  );
};

export default SelectedUser;
