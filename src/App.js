import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import {NOTES_ON_PAGE, tableHeadNames, URL_BIG} from "./utils/data";
import TableHead from "./components/tableHead/TableHead";
import ButtonAdd from "./components/buttonAdd/ButtonAdd";
import TableInput from "./components/tableInput/TableInput";
import ButtonSelect from "./components/buttonSelect/ButtonSelect";
import SelectionBlock from "./components/selectionBlock/SelectionBlock";
import SearchForm from "./components/searchForm/SearchForm";
import SelectedUser from "./components/selectedUser/SelectedUser";
import Paginator from "./components/paginator/Paginator";

const App = () => {
  const [data, setData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [url, setUrl] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);

  let firstLimit = (currentPage - 1) * NOTES_ON_PAGE;
  let secondLimit = firstLimit + NOTES_ON_PAGE;

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

  const handlePageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="page">
      <div className="page__cover">
        <h1 className="page__title">Таблица</h1>
        <SelectionBlock>
          <ButtonSelect name={'Много'} setUrl={setUrl}/>
          <ButtonSelect name={'Мало'} setUrl={setUrl}/>
        </SelectionBlock>
        <SearchForm handleFilter={handleFilter} data={data}/>
        <ButtonAdd/>
        {data.length && url === URL_BIG ? <Paginator currentPage={currentPage} handlePageChanged={handlePageChanged} /> : null}
        <table className="table">
          <thead className="table__title">
            <TableHead sortedField={sortedField} handleSort={handleSort}/>
          </thead>
          <tbody className="table__body">
          <TableInput/>
          {data.length ? data.slice(firstLimit, secondLimit).map((item) => (
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
        <SelectedUser selectedUser={selectedUser}/>
      </div>
    </div>
  );
}

export default App;
