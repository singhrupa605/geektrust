import React from 'react';
import { Input} from '@mui/material';

const mycss = {
  margin:"1rem", 
  alignSelf:"center",
   padding:"0.8rem",
    width:"50%",
   ".MuiInput-input":
   {
    color: "#FFFFFF" ,
    textAlign:"center",
   }
}

const SearchBar = ({
  searchtext,
  setSearchText,
  employees,
  setFilteredList,
}) => {
  const handleSearch = (event) => {

   

    const value = event.target.value;
    setSearchText(value);
    if (searchtext) {
      const text = searchtext.toLowerCase();
      const list = employees.filter((emp) => {
        return (
          emp.role.toLowerCase().includes(text) ||
          emp.email.toLowerCase().includes(text) ||
          emp.name.toLowerCase().includes(text)
        );
      });
      setFilteredList(list);
    } else {
      setFilteredList(employees);
    }
  };

  return ( 
<Input
  onChange={handleSearch}
  className="searchbox"
  multiline
  sx={mycss}
  color="primary"
  placeholder="Search by name , email or role"
  value={searchtext}
/>
  );
};

export default SearchBar;
