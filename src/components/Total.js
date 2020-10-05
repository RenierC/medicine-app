import React from "react";
import { useStateValue } from "../StateProvider";
import { totalCesta } from "../reducer";
import CurrencyFormat from "react-currency-format";

import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
// this is the total component that shows in the basket
function Total() {
  const [{ basket }] = useStateValue();

  const useStyles = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      backgroundColor: "#f1faee",
      maxWidth: "300px",
      margin: "2rem",
    },
    content: {
      padding: "1rem",
    },
  });
  const classes = useStyles();
  return (
    <div className="mainTotal">
      <Card elevation={4} className={classes.root}>
        <CardContent className={classes.content}>
          <CurrencyFormat
            renderText={(value) => (
              <Typography variant="h5" component="h5">
                Total a pagar: <strong>{value}</strong>
              </Typography>
            )}
            decimalScale={2}
            value={totalCesta(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"RD$"}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Total;
