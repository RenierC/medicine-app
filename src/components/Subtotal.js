import React from "react";
import CurrencyFormat from "react-currency-format";

//this is the total that appears in each product
function Subtotal({ cantidad, precio }) {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => <strong>{value}</strong>}
        decimalScale={2}
        value={cantidad * precio}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"RD$"}
      />
    </div>
  );
}

export default Subtotal;
