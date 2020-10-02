import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { totalCesta } from "../reducer";
import { useStateValue } from "../StateProvider";
import "./Total.css";

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
