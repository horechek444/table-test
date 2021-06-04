import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import {tableHeadNames, URL_BIG, NOTES_ON_PAGE} from "./utils/data";
import TableHead from "./components/tableHead/TableHead";
import ButtonAdd from "./components/buttonAdd/ButtonAdd";
import TableInput from "./components/tableInput/TableInput";
import ButtonSelect from "./components/buttonSelect/ButtonSelect";
import SelectionBlock from "./components/selectionBlock/SelectionBlock";
import SearchForm from "./components/searchForm/SearchForm";
import SelectedUser from "./components/selectedUser/SelectedUser";
import Paginator from "./components/paginator/Paginator";
import Loading from "./components/loading/Loading";
import useSortableData from "./hooks/useSortableData";
import useValidation from "./hooks/useValidation";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [url, setUrl] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const [inputShow, setInputShow] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {sortedProducts, requestSort, sortConfig} = useSortableData(data);
  const {isValid, inputValue, setInputValue, validationMessage, handleInputChange} = useValidation();

  let firstLimit = (currentPage - 1) * NOTES_ON_PAGE;
  let secondLimit = firstLimit + NOTES_ON_PAGE;

  const getData = useCallback(() => {
    let link = `http://www.filltext.com/?rows=${url}`;
    setIsLoading(true);
    fetch(link)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [url]);

  useEffect(() => {
    getData();
  }, [url]);

  const handleFilter = (searchRequest) => {
    data.filter(item => {
      tableHeadNames.map((name) => {
        if (item[name] == searchRequest) {
          setData([item]);
        }
      })
    })
  };

  const handlePageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputShow = () => {
    setInputShow(true);
  };

  const handleButtonDisable = () => {
    if (isValid.id && isValid.firstName && isValid.lastName && isValid.email && isValid.phone) {
      setButtonDisable(false);
    }
  };

  useEffect(() => {
    handleButtonDisable()
  }, [isValid]);

  const onSubmit = (event) => {
    event.preventDefault();
    setData((data) => ([{
      id: inputValue.id,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      email: inputValue.email,
      phone: inputValue.phone,
      address: {
        streetAddress: 'unknown',
        city: 'unknown',
        state: 'unknown',
        zip: 'unknown'
      },
      description: 'et lacus magna dolor...',
    }, ...data]));
    setInputShow(false);
    setInputValue("");
    setButtonDisable(true);
  };

  return (
    <div className="page">
      <div className="page__cover">
        <h1 className="page__title">Таблица</h1>
        <SelectionBlock>
          <ButtonSelect name={"Много"} setUrl={setUrl}/>
          <ButtonSelect name={"Мало"} setUrl={setUrl}/>
        </SelectionBlock>
        <SearchForm handleFilter={handleFilter} data={data}/>
        <ButtonAdd className="button add__button" type="button" name="Добавить" onClick={handleInputShow} />
        <form noValidate id="inputForm" onSubmit={onSubmit}>
          <ButtonAdd className="button add-in-table__button" type="submit" name="Добавить в таблицу"
                     disabled={buttonDisable} />
        </form>
        {data.length && url === URL_BIG ?
          <Paginator currentPage={currentPage} handlePageChanged={handlePageChanged} /> : null}
        {isLoading ? <Loading loading={isLoading} /> : <table className="table">
          <thead className="table__title">
            <TableHead sortConfig={sortConfig} requestSort={requestSort} />
          </thead>
          <tbody className="table__body">
          {inputShow && <TableInput
            handleInputChange={handleInputChange}
            inputValue={inputValue}
            validationMessage={validationMessage}
            isValid={isValid}
          />}
          {(sortedProducts ? sortedProducts : data).slice(firstLimit, secondLimit).map((item) => (
            <tr key={item.email} className="table__row" onClick={() => setSelectedUser(item)}>
              {tableHeadNames.map((name) =>
                (<td key={name} className="table__cell">
                  {item[name]}
                </td>)
              )}
            </tr>
          ))
          }
          </tbody>
        </table>}
        <SelectedUser selectedUser={selectedUser}/>
      </div>
    </div>
  );
}

export default App;
