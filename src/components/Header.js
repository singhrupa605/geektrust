import { Box, Typography } from "@mui/material";
import "./Header.css";
import React  from 'react';

const Header = () => {
  return (
    <Box className="header">
      <Typography variant="h5" className="heading">
        [ Employee Table ]
      </Typography>
    </Box>
  );
};

export default Header;
