import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "../StateProvider";
import Subtotal from "./Subtotal";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#f1faee",
    margin: "2rem",
    maxWidth: 600,
    minWidth: 200,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    // border: "1px red solid",
  },
  cantidadField: {
    float: "right",
  },
  subtotal: {
    textAlign: "right",
  },
  boton: {
    flex: "1 0 auto",
    width: "100%",
    padding: "1rem",
    // alignSelf: "flex-end",
    // flexGrow: 1,
    // border: "1px red solid",
  },
});

export default function Producto({
  id,
  producto,
  precio,
  cantidad,
  presentacion,
}) {
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(cantidad);

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  const updateQuantity = (newValue) => {
    console.log("✏ value changed " + newValue);
    setQuantity(newValue);
    dispatch({
      type: "UPDATE_QUANTITY",
      id: id,
      cantidad: Number(newValue),
    });
  };
  // el producto mas largo es Anestesico Local + Astringente + Antiflamatorio
  return (
    <Card elevation={4} className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1">{producto}</Typography>
          <Typography variant="body2" component="p">
            {presentacion}
          </Typography>
        </CardContent>
      </div>
      {/* CAntidad */}
      <CardContent className={classes.content}>
        <div className={classes.cantidadField}>
          <TextField
            name="cantidad"
            value={quantity}
            InputProps={{
              inputProps: { min: 1, style: { textAlign: "center" } },
            }}
            label="Cantidad"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            size="small"
            style={{ width: "5rem" }}
            onChange={(event) => updateQuantity(event.target.value)}
          />
        </div>
      </CardContent>
      <div className={classes.subtotal}>
        <CardContent className={classes.content}>
          {/* <Typography variant="body1" component="h6" align="center">
          RD$<strong>{cantidad * precio}</strong>
        </Typography> */}
          <Subtotal cantidad={cantidad} precio={precio} />
        </CardContent>
      </div>

      {/* boton */}
      <CardActions className={classes.boton}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={removeFromBasket}
        >
          Borrar
        </Button>
      </CardActions>
    </Card>
  );
}
