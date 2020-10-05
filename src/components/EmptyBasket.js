import React from "react";
import { Link } from "react-router-dom";

import "./EmptyBasket.css";
import { Button } from "@material-ui/core";
import emptyBasketIcon from "../assets/emptyCart.svg";
// component being shown when the basket is empty (the guy with picture and button to go back)
function EmptyBasket() {
  return (
    <div className="imgParent">
      <h1 className="myText">
        Su carrito está vacío, haga click{" "}
        <Button
          size="small"
          variant="contained"
          component={Link}
          to="/"
          color="primary"
        >
          Aquí
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
