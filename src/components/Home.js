import { Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import "./Home.css";
import Header from "./Header";
import Footer from "./Footer";
import EditDialog from "./EditDialog";
import { useSnackbar } from "notistack";
import SearchBar from "./SearchBar";
import React  from 'react';
import {Box} from "@mui/material"
const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const rowsPerPage = 10;
  const [searchtext, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [idInEdit, setIdinEdit] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(URL);
      setEmployees(response.data);
    } catch (error) {
      console.log("Error in getting users", error);
    }
  };

  const handleDelete = (id) => {
    const newList = employees.filter((emp) => emp.id !== id);
    const newFilteredList = filteredList.filter((emp) => emp.id !== id);
    setEmployees(newList);
    setFilteredList(newFilteredList);
    enqueueSnackbar("Data deleted successfully ", { variant: "success" });
  };

  const addToSelectedRows = (event) => {
    let newList = [...selectedRows];
    const id = event.target.value;

    if (event.target.checked) {
      newList = [...selectedRows, id];
    } else {
      const index = newList.indexOf(id);
      newList.splice(index, index + 1);
    }
    setSelectedRows(newList);
  };

  const deleteSelected = () => {
    const newList = employees.filter((employee) => {
      return !selectedRows.includes(employee.id);
    });
    const newFilteredList = filteredList.filter((employee) => {
      return !selectedRows.includes(employee.id);
    });
    setFilteredList(newFilteredList);
    setEmployees(newList);
    setIsChecked(false);

    if (
      (selectedRows.length && newList.length) ||
      (selectedRows.length && newFilteredList.length)
    ) {
      enqueueSnackbar("Data deleted successfully ", { variant: "success" });
      const rowsLeft = filteredList.length ? filteredList.length
      : employees.length;
    const totalPages = Math.ceil(rowsLeft / rowsPerPage);
    if (page === totalPages - 1 && totalPages > 1) {
      setPage(page - 1);
    }

     } else {
      enqueueSnackbar("No data selected to delete ", { variant: "warning" });
    }
   
  
  };

  const handleHeaderCheckBox = (event) => {
    let updatedList = [...selectedRows];
    const data = [...currentPageRows];
    if (event.target.checked) {
      updatedList = data.map((employee) => employee.id);
      setIsChecked(true);
    } else {
      setIsChecked(false);
      updatedList = [];
    }
    setSelectedRows(updatedList);
  };

  const handleEdit = (id) => {
    setOpen(true);
    setIdinEdit(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const lastIndex = (page + 1) * rowsPerPage;
  const beginIndex = lastIndex - rowsPerPage;
  const currentPageRows = filteredList.length
    ? filteredList.slice(beginIndex, lastIndex)
    : employees.slice(beginIndex, lastIndex);

  return (
    <Box className="parent">
    <Header />
    <Container >
      <SearchBar
        employees={employees}
        searchtext={searchtext}
        setSearchText={setSearchText}
        setFilteredList={setFilteredList}
      />
      <EmployeeTable
        isChecked={isChecked}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleHeaderCheckBox={handleHeaderCheckBox}
        currentPageRows={currentPageRows}
        selectedRows={selectedRows}
        addToSelectedRows={addToSelectedRows}
      />
      {open ? (
        <EditDialog
          open={open}
          handleClose={handleClose}
          id={idInEdit}
          employees={employees}
          setEmployees={setEmployees}
          filteredList={filteredList}
          setFilteredList={setFilteredList}
        />
      ) : null}
      <Footer
        page={page}
        setPage={setPage}
        filteredList={filteredList}
        rowsPerPage={rowsPerPage}
        employees={employees}
        deleteSelected={deleteSelected}
      />
    </Container>
    </Box>
  );
};

export default Home;
