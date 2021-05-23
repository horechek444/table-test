import React from "react";
import "./searchForm.css";

const SearchForm = ({handleFilter, data}) => {
  const [searchInputValue, setSearchInputValue] = React.useState("");

  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchInputValue) {
    } else {
      handleFilter(searchInputValue);
      setSearchInputValue("");
    }
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
