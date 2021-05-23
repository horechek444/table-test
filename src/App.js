import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import TableHead from "./components/tableHead/tableHead";
import ButtonAdd from "./components/buttonAdd/buttonAdd";
import TableInput from "./components/tableInput/tableInput";
import {tableHeadNames} from "./utils/data";
import ButtonSelect from "./components/buttonSelect/buttonSelect";
import SelectionBlock from "./components/selectionBlock/selectionBlock";
import SearchForm from "./components/searchForm/searchForm";
import SelectedUser from "./components/selectedUser/selectedUser";

const App = () => {
  const [data, setData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [url, setUrl] = useState('0');

  const getData = useCallback(() => {
    let link = `http://www.filltext.com/?rows=${url}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [url]);

  useEffect(() => {
    getData();
  }, [url]);

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

  const handleFilter = (searchRequest) => {
    data.filter(item => {
      tableHeadNames.map((name) => {
        if (item[name] == searchRequest) {
          setData([item]);
        }
      })
    })
  }

  return (
    <div className="page">
      <div className="page__cover">
        <h1 className="page__title">Таблица</h1>
        <SelectionBlock>
          <ButtonSelect name={'Много'} setUrl={setUrl}/>
          <ButtonSelect name={'Мало'} setUrl={setUrl}/>
        </SelectionBlock>
        <SearchForm handleFilter={handleFilter} data={data} />
        <ButtonAdd/>
        <table className="table">
          <thead className="table__title">
          <TableHead sortedField={sortedField} handleSort={handleSort}/>
          </thead>
          <tbody className="table__body">
          <TableInput/>
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
        <SelectedUser selectedUser={selectedUser} />
      </div>
    </div>
  );
}

export default App;
