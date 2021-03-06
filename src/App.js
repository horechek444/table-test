import React, {useCallback, useEffect, useState} from "react";
import "./App.css";
import {tableHeadNames, URL_BIG} from "./utils/data";
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
import TableBody from "./components/tableBody/TableBody";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [url, setUrl] = useState('0');
  const [inputShow, setInputShow] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {sortedProducts, requestSort, sortConfig, currentPage, setCurrentPage} = useSortableData(data);
  const {isValid, inputValue, setInputValue, validationMessage, handleInputChange} = useValidation();

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

  const handleAddSubmit = (event) => {
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
        <h1 className="page__title">??????????????</h1>
        <SelectionBlock>
          <ButtonSelect name={"??????????"} setUrl={setUrl}/>
          <ButtonSelect name={"????????"} setUrl={setUrl}/>
        </SelectionBlock>
        <SearchForm handleFilter={handleFilter} data={data}/>
        <div className="page__table-wrapper">
          <ButtonAdd className="button add__button" type="button" name="????????????????" onClick={handleInputShow}/>
          <form noValidate id="inputForm" onSubmit={handleAddSubmit}>
            <ButtonAdd className="button add-in-table__button" type="submit" name="???????????????? ?? ??????????????"
                       disabled={buttonDisable}/>
          </form>
          {data.length && url === URL_BIG ?
            <Paginator currentPage={currentPage} handlePageChanged={handlePageChanged}/> : null}
          {isLoading ? <Loading loading={isLoading}/> : <table className="table">
            <thead className="table__title">
            <TableHead sortConfig={sortConfig} requestSort={requestSort}/>
            </thead>
            <tbody className="table__body">
            {inputShow && <TableInput
              handleInputChange={handleInputChange}
              inputValue={inputValue}
              validationMessage={validationMessage}
              isValid={isValid}
            />}
            <TableBody setSelectedUser={setSelectedUser} sortedProducts={sortedProducts}/>
            </tbody>
          </table>}
          <SelectedUser selectedUser={selectedUser}/>
        </div>
      </div>
    </div>
  );
}

export default App;
