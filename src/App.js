import React, { useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Basket from "./components/Basket";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import EmptyBasket from "./components/EmptyBasket";

function App() {
  const [{ basket }, dispatch] = useStateValue();

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
  }, []);

  // Add everything that is in the basket to localStorage
  useEffect(() => {
    localStorage.setItem("localStorageBasket", JSON.stringify(basket));
  }, [basket]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/empty">
            <EmptyBasket />
          </Route>
          <Route path="/checkout">
            <Basket />
          </Route>
          <Route path="/">
            <Table />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
