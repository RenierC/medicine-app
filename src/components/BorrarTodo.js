import React from "react";
import { useStateValue } from "../StateProvider";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DeleteIcon from "@material-ui/icons/Delete";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [, dispatch] = useStateValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const borrarTodo = () => {
    showSnack("info");
    dispatch({
      type: "REMOVE_ALL_FROM_BASKET",
    });
    setOpen(false);
  };

  const showSnack = (message) => {
    dispatch({
      type: "SHOW_SNACKBAR",
      kind: message,
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ backgroundColor: "red", color: "white" }}
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
      >
        Borrar Todo
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"¿Está seguro?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Esta opción borrará todo lo que está en su cesta
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={borrarTodo} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
