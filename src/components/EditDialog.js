import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./EditDialog.css";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Stack, Button } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import React from 'react';

const EditDialog = ({ id, open, handleClose, employees, setEmployees }) => {
  const employee = employees.find((emp) => emp.id === id);
  const { enqueueSnackbar } = useSnackbar();

  const [newData, setNewData] = useState({
    id: employee.id,
    name: employee.name,
    email: employee.email,
    role: employee.role,
  });

  const validateData = (name, email, role) => {
    var nameregex = /^[a-zA-Z ]{2,30}$/;
    var emailregex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    var roles = ["admin", "member"];
    if (!nameregex.test(name)) {
      enqueueSnackbar(
        "Please enter name with only characters with length between 2-30",
        { variant: "warning" }
      );
      return false;
    }
    if (!emailregex.test(email)) {
      enqueueSnackbar("Please enter a valid email", { variant: "warning" });
      return false;
    }
    if (!roles.includes(role)) {
      enqueueSnackbar("Role should be member or admin", { variant: "warning" });
      return false;
    }
    return true;
  };

  const saveEdit = () => {
    if (validateData(newData.name, newData.email, newData.role)) {
      const newEmployees = employees.map((emp) => {
        if (emp.id === id) {
          emp = { ...newData };
        }
        return emp;
      });

      setEmployees(newEmployees);
      enqueueSnackbar("Data saved successfully", { variant: "success" });
      handleClose();
    }
  };

  const getValue = (event) => {
    let { name, value } = event.target;
    console.log("New value : " + value);
    if (value.trim().length === 0) {
      value = newData[name];
    }
    setNewData((values) => {
      return {
        ...values,
        [name]: value.trim(),
      };
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}  >
      <DialogTitle className="dialogtitle">Edit Employee Data</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          type="text"
          name="name"
          fullWidth
          onChange={getValue}
          variant="standard"
          placeholder={employee.name}
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          type="text"
          name="email"
          fullWidth
          onChange={getValue}
          variant="standard"
          placeholder={employee.email}
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          type="text"
          name="role"
          fullWidth
          onChange={getValue}
          variant="standard"
          placeholder={employee.role}
        ></TextField>
        <Stack direction="row" className="dialogButtons">
        <Button variant="contained" onClick={saveEdit}>Save</Button>
          <Button variant="contained"  onClick={handleClose}>Cancel</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
