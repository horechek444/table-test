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
  const fieldsEnumeration = (value) => {
    return (
      tableHeadNames.reduce((acc, field) => {
        acc[field] = value;
        return acc
      }, {})
    )
  };

  const [isValid, setIsValid] = React.useState(fieldsEnumeration(false));
  const [inputValue, setInputValue] = React.useState(fieldsEnumeration(''));
  const [validationMessage, setValidationMessage] = React.useState(fieldsEnumeration(''));

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });

    setIsValid({
      ...isValid,
      [name]: event.target.validity.valid
    });

    setValidationMessage({
      ...validationMessage,
      [name]: event.target.validationMessage
    });
  };





  const [data, setData] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [url, setUrl] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const [inputShow, setInputShow] = useState(false);

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

  const handleInputShow = () => {
    setInputShow(true);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setData({
      id: inputValue.id,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      email: inputValue.email,
      phone: inputValue.phone,
    });
    setInputShow(false);
    setInputValue("");
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
        <ButtonAdd type="button" name="Добавить" onClick={handleInputShow} />
        <form noValidate id="inputForm" onSubmit={onSubmit}>
          <ButtonAdd type="submit" name="Добавить в таблицу"/>
        </form>
        {data.length && url === URL_BIG ? <Paginator currentPage={currentPage} handlePageChanged={handlePageChanged} /> : null}
        <table className="table">
          <thead className="table__title">
            <TableHead sortedField={sortedField} handleSort={handleSort}/>
          </thead>
          <tbody className="table__body">
          {inputShow && <TableInput
            handleInputChange={handleInputChange}
            inputValue={inputValue}
            validationMessage={validationMessage}
            isValid={isValid}
          />}
          {/*<tr className="table__row">*/}
          {/*  {tableHeadNames.map((item) =>*/}
          {/*    (<td key={item} className="table__cell"></td>)*/}
          {/*  )}*/}
          {/*</tr>*/}
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
