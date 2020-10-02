import React from "react";
import { useStateValue } from "../StateProvider";
import "./Basket.css";

import Producto from "./Producto";
import Total from "./Total";
import BorrarTodo from "./BorrarTodo";
import EmptyBasket from "./EmptyBasket";

function Basket() {
  const [{ basket }] = useStateValue();

  return (
    <div className="container">
      {basket.length === 0 ? (
        <EmptyBasket />
      ) : (
        <div className="basket">
          {/* <h3>Ud tiene {basket?.length} productos en la cesta </h3> */}

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
            <div className="btnBorrarTodo">
              <BorrarTodo />
            </div>
          </div>

          <div className="totalBasket">
            <Total />
          </div>
        </div>
      )}
    </div>
  );
}

export default Basket;
