import React from "react";
import "./App.css";
import Table from "./components/Table";
import Basket from "./components/Basket";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
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
