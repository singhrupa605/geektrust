import { Table, Stack, Form } from "react-bootstrap";
import { Button } from "@mui/material";
import "./EmployeeTable.css"
import React  from 'react';

const EmployeeTable = ({
  isChecked,
  handleHeaderCheckBox,
  currentPageRows,
  selectedRows,
  addToSelectedRows,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
      className="table"
      bsPrefix="table"
    >
      <thead className="thead">
        <tr key={0} id={0}>
          <th >
            <Form.Check
              type="checkbox"
              checked={isChecked}
              className="checkbox"
              onChange={handleHeaderCheckBox}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentPageRows.map((employee) => {
          return (
            <tr key={employee.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  value={employee.id}
                  checked={selectedRows.includes(employee.id)}
                  onChange={(event) => addToSelectedRows(event)}
                  className="checkbox"
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <Stack direction="horizontal" className="actions">
                  <Button
                    variant="link"
                    size="md"
                    onClick={() => handleEdit(employee.id)}
                  >
                    <i className="bi bi-pencil-square text-primary"></i>
                  </Button>
                  <Button
                    variant="link"
                    size="md"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <i className="bi bi-trash text-danger"></i>
                  </Button>
                </Stack>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default EmployeeTable;
