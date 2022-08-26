import { createTheme} from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato"
  },
  palette: {
    primary: {
      main: "#cee4cf",
      contrastText: "#FFFFFF",
    },
     secondary:
    {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
  
  },
});

export default theme;