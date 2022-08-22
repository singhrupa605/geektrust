import { Button } from "@mui/material";
import CustomPagination from "./CustomPagination";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Row, Col } from "react-bootstrap";
import "./Footer.css";
import React from 'react';

const Footer = ({
  deleteSelected,
  filteredList,
  employees,
  page,
  setPage,
  rowsPerPage,
}) => {
  return (
    <Row className="footer pt-2 pt-md-0">
      <Col xs={12} md={4} sm={6}  className= "justify-content-sm-start justify-content-center   d-flex"  > 
        <Button
          uppercase="false"
          className="deleteAll"
          color="primary"
          onClick={deleteSelected}
            
        >
          <DeleteSweepIcon sx={{marginRight:"0.5rem"}}
          />{" "}
          <span >
            {" "}
            Delete Selected
          </span>
        </Button>
      </Col>
      <Col xs={12} md={8} sm={6}  >
        <CustomPagination
          page={page}
          setPage={setPage}
          totalRows={
            filteredList.length ? filteredList.length : employees.length
          }
          rowsPerPage={rowsPerPage}
        />
      </Col>
    </Row>
  );
};

export default Footer;
