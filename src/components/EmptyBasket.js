import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import emptyBasketIcon from "../assets/emptyCart.svg";
import "./EmptyBasket.css";

function EmptyBasket() {
  return (
    <div className="imgParent">
      <h1>
        Su carrito esta vacio haga click{" "}
        <Button
          size="small"
          variant="contained"
          component={Link}
          to="/"
          color="primary"
        >
          Acá
        </Button>{" "}
        para agregar productos
      </h1>

      <div className="emptyIcon">
        <img src={emptyBasketIcon} alt="empty basket icon" />
      </div>
    </div>
  );
}

export default EmptyBasket;
