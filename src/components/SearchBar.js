import "./SearchBar.css";
import React from 'react';

const SearchBar = ({
  searchtext,
  setSearchText,
  employees,
  setFilteredList,
}) => {
  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchText(value);
    console.log("search :" + searchtext);
    if (searchtext) {
      const list = employees.filter((emp) => {
        return (
          emp.role.includes(searchtext) ||
          emp.email.includes(searchtext) ||
          emp.name.includes(value)
        );
      });
      setFilteredList(list);
    } else {
      setFilteredList(employees);
    }
  };
  return (
    <input
      label="Search"
      className="search"
      onChange={handleSearch}
      placeholder="Search by name , email or role"
    />
  );
};

export default SearchBar;
