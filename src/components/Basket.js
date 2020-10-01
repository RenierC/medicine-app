import React from "react";
import { useStateValue } from "../StateProvider";
import "./Basket.css";
import Producto from "./Producto";
import Total from "./Total";

function Basket() {
  const [{ basket }] = useStateValue();
  // console.log(basket[0]);
  // const cesta = basket[0];
  return (
    <div className="basket">
      <h3>Ud tiene {basket?.length} productos en la cesta </h3>
      <div className="total">
        <Total />
      </div>
      <div className="enCesta">
        {basket.map((producto) => (
          <Producto
            key={producto.id}
            id={producto.id}
            producto={producto.producto}
            presentacion={producto.presentacion}
            precio={producto.precio}
            cantidad={producto.cantidad}
          />
        ))}
      </div>
    </div>
  );
}

export default Basket;
