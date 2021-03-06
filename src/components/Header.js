import React from "react";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { ShoppingBasket } from "@material-ui/icons";
import { Badge, ThemeProvider } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import theme from "../assets/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [{ basket }] = useStateValue();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            {/* boton de inicio */}
            <Button
              component={Link}
              to="/"
              color="inherit"
              variant="outlined"
              startIcon={<HomeIcon />}
            >
              Inicio
            </Button>

            <Typography variant="h6" className={classes.title}></Typography>

            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/checkout"
            >
              <Badge badgeContent={basket?.length} color="secondary">
                <ShoppingBasket />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
