import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import TableHead from "./components/tableHead/tableHead";
import ButtonAdd from "./components/buttonAdd/buttonAdd";
import TableBody from "./components/tableBody/tableBody";

const App = () => {
  const [data, setData] = useState([]);
  const [sortedField, setSortedField] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);

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
    let url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, []);

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="page">
      <div className="page__cover">
        <ButtonAdd />
        <table className="table">
          <thead className="table__title">
            <TableHead sortedField={sortedField} handleSort={handleSort} />
          </thead>
          <tbody className="table__body">
            <TableBody />
              {data.map((item) => (
                  <tr key={item.email} className="table__row" onClick={() => setSelectedUser(item)}>
                    <td className="table__cell">{item.id}</td>
                    <td className="table__cell">{item.firstName}</td>
                    <td className="table__cell">{item.lastName}</td>
                    <td className="table__cell">{item.email}</td>
                    <td className="table__cell">{item.phone}</td>
                  </tr>
              ))}

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
