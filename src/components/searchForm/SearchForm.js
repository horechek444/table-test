import React, {useState} from "react";
import "./SearchForm.css";

const SearchForm = ({handleFilter, data}) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleFilter(searchInputValue);
    setSearchInputValue("");
  }

  return (
    <form className="search__form" noValidate onSubmit={handleSearchSubmit}>
      <label className="search__cover">Введите данные для поиска:&nbsp;
        <input className="search__input" type="search" value={searchInputValue} onChange={handleSearchInputChange} disabled={!data.length} />
      </label>
      <button className="button search__button" type="submit" disabled={!searchInputValue || !data.length}>Найти</button>
    </form>
  );
};

export default SearchForm;
