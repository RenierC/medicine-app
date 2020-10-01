import React, { useEffect, useState } from "react";
import "./Table.css";
import medicinas from "./medicinas.json";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import { v4 as uuidv4 } from "uuid";

import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

function Table() {
  const [tabla, setTabla] = useState();

  const [{ basket }, dispatch] = useStateValue();

  console.log("🧺 " + JSON.stringify(basket));

  const addToBasket = (tableMeta) => {
    const amount = tableMeta.rowData[3];
    let cantidad = () => (amount ? amount : 1);

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: uuidv4(),
        // id: tableMeta.rowIndex,
        producto: tableMeta.rowData[0],
        presentacion: tableMeta.rowData[1],
        precio: Number(tableMeta.rowData[2]),
        cantidad: Number(cantidad()),
      },
    });
  };

  useEffect(() => {
    setTabla(medicinas);
  }, []);

  // funcion para hablar con db
  // useEffect(() => {
  //   db.collection("medicinas").onSnapshot((snapshot) => {
  //     console.log(snapshot.docs.map((doc) => doc.data()));
  //     setTabla(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  // function to change the header color
  function getMuiTheme() {
    return createMuiTheme({
      overrides: {
        MuiTableCell: {
          head: {
            backgroundColor: "#23272a !important",
            color: "#ffffff",
          },
        },
      },
    });
  }

  const columns = [
    { name: "producto", label: "Producto" },
    { name: "presentacion", label: "Presentación" },
    { name: "precio", label: "Precio (RD$)" },
    {
      name: "Cantidad",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            control={
              <TextField
                defaultValue="1"
                InputProps={{ inputProps: { min: 1 } }}
                style={{ width: "3rem" }}
                type="number"
              />
            }
            onBlur={(event) => updateValue(event.target.value)}
          />
        ),
      },
    },
    {
      name: "Agregar",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              onClick={(e) => {
                addToBasket(tableMeta);
                // console.log(tableMeta.rowData[3]);

                // id = tableMeta.rowIndex
                // producto = tableMeta.rowData[0]
                // presentacion = tableMeta.rowData[1]
                // precio = tableMeta.rowData[2]
                // cantidad = tableMeta.rowData[3]
              }}
              control={
                <Checkbox
                  icon={<ShoppingBasketOutlinedIcon />}
                  checkedIcon={<ShoppingBasketIcon />}
                  name="checkedH"
                />
              }
            />
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    searchOpen: true,
    searchPlaceholder: "Digite aca su busqueda",
    selectableRows: "multiple",
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false,
    enableNestedDataAccess: ".",
    pagination: true,
  };

  return (
    <div className="mainTable">
      <div className="table">
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable data={tabla} columns={columns} options={options} />
        </MuiThemeProvider>
      </div>
    </div>
  );
}

export default Table;
