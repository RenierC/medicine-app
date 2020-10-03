import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../StateProvider";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackbarMessage() {
  const classes = useStyles();

  const [{ showSnacks, kind }, dispatch] = useStateValue();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({
      type: "CLOSE_SNACKBAR",
    });
  };

  const message = (kind) => {
    return kind === "success" ? "Producto agregado" : "Producto eliminado";
  };

  return (
    <div className={classes.root}>
      <Snackbar open={showSnacks} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={kind}>
          {message(kind)}
        </Alert>
      </Snackbar>
    </div>
  );
}
