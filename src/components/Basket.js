import React from "react";
import { useStateValue } from "../StateProvider";
import "./Basket.css";
import Producto from "./Producto";
import Total from "./Total";
import BorrarTodo from "./BorrarTodo";
import EmptyBasket from "./EmptyBasket";
import { motion } from "framer-motion";
import theme from "../assets/theme";

import { ThemeProvider } from "@material-ui/core";

// main basket component where the totals and product card goes
function Basket() {
  const [{ basket }] = useStateValue();
  // animation variables
  const pageVariants = {
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "100vw",
    },
  };
  const pageTransition = {
    type: "linear",
  };
  // animation variables

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="container"
      >
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
      </motion.div>
    </ThemeProvider>
  );
}

export default Basket;
