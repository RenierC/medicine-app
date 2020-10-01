import React from "react";
import CurrencyFormat from "react-currency-format";
import { totalCesta } from "../reducer";
import { useStateValue } from "../StateProvider";

function Total() {
  const [{ basket }] = useStateValue();
  return (
    <div className="total">
      <CurrencyFormat
        renderText={(value) => <h1>This is the total {value}</h1>}
        decimalScale={2}
        value={totalCesta(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"RD$"}
      />
    </div>
  );
}

export default Total;
