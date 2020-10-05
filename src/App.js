import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Table from "./components/Table";
import Basket from "./components/Basket";
import Header from "./components/Header";
import SnackbarMessage from "./components/SnackbarMessage";
import { AnimatePresence } from "framer-motion";
import db from "./firebase";

function App() {
  const [{ basket }, dispatch] = useStateValue();
  const [tablaV2, setTablaV2] = useState([]);

  // if there is local storage populate basket in the data layer with it
  useEffect(() => {
    const data = localStorage.getItem("localStorageBasket");
    if (data) {
      JSON.parse(data).map((e) =>
        dispatch({
          type: "ADD_TO_BASKET",
          item: {
            id: e.id,
            producto: e.producto,
            presentacion: e.presentacion,
            precio: e.precio,
            cantidad: e.cantidad,
          },
        })
      );
    }
  }, [dispatch]);

  // antes el dispatch no estaban en [] if something fails check that solo estaban []

  // Add everything that is in the basket to localStorage
  useEffect(() => {
    localStorage.setItem("localStorageBasket", JSON.stringify(basket));
  }, [basket]);

  // fetch the data from firebase
  useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("medicinas")
        .orderBy("producto", "asc")
        .get();
      setTablaV2(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App" style={{ overflowX: "hidden" }}>
        <Header />
        <SnackbarMessage />
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route path="/checkout">
              <Basket />
            </Route>
            <Route path="/">
              <Table tablaV2={tablaV2} />
            </Route>
          </Switch>
        </AnimatePresence>
        <div className="footer">
          <a
            href="https://www.linkedin.com/in/renierc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Desarrollado por Renier Cuervo <span>©</span>
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;
