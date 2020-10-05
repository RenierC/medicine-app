import { createMuiTheme } from "@material-ui/core/styles";
// the teal blue used, add secondary to apply secondary color to everything else
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#3796a3",
      main: "#057c8c",
      dark: "#035662",
      contrastText: "#fff",
    },
  },
});

export default theme;
