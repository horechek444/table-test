import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import TableHead from "./components/tableHead/tableHead";
import ButtonAdd from "./components/buttonAdd/buttonAdd";
import TableBody from "./components/tableBody/tableBody";
import {tableHeadNames} from "./utils/data";
import ButtonSelect from "./components/buttonSelect/buttonSelect";
import SelectionBlock from "./components/selectionBlock/selectionBlock";

const App = () => {
  const [data, setData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [url, setUrl] = useState('0');

  const handleSort = (field) => {
    setSortedField(field);
    // let sortedData = [...data];
    // sortedData.forEach((item) => {
    //   if (sortedField !== null) {
    //     item[field].sort((a, b) => {
    //       if (a[field] < b[field]) {
    //         return -1;
    //       }
    //       if (a[field] > b[field]) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //   }
    // })
  }

  const getData = useCallback(() => {
    let link = `http://www.filltext.com/?rows=${url}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [url]);

  useEffect(() => {
    getData();
  }, [url]);

  return (
    <div className="page">
      <div className="page__cover">
        <h1 className="page__title">Таблица</h1>
        <SelectionBlock>
          <ButtonSelect name={'Много'} setUrl={setUrl} />
          <ButtonSelect name={'Мало'} setUrl={setUrl} />
        </SelectionBlock>
        <ButtonAdd />
        <table className="table">
          <thead className="table__title">
            <TableHead sortedField={sortedField} handleSort={handleSort} />
          </thead>
          <tbody className="table__body">
            <TableBody />
            {data.length ? data.map((item) => (
                <tr key={item.email} className="table__row" onClick={() => setSelectedUser(item)}>
                  {tableHeadNames.map((name) =>
                    (<td key={name} className="table__cell">
                      {item[name]}
                    </td>)
                  )}
                </tr>
              )) : null
            }
          </tbody>
        </table>
        {selectedUser && <div className="table__selected-row">
          Выбран пользователь: <b>{selectedUser.firstName + " " + selectedUser.lastName}</b>
          Описание: <b>{selectedUser.description}</b>
          Адрес проживания: <b>{selectedUser.address.streetAddress}</b>
          Город: <b>{selectedUser.address.city}</b>
          Провинция/штат: <b>{selectedUser.address.state}</b>
          Индекс: <b>{selectedUser.address.zip}</b>
        </div>}
      </div>
    </div>
  );
}

export default App;
