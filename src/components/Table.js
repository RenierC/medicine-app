import React, { useEffect, useState } from "react";
import "./Table.css";
import medicinas from "./medicinas.json";
import { useStateValue } from "../StateProvider";
//import db from "../firebase";
import { v4 as uuidv4 } from "uuid";

import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { IconButton, TextField } from "@material-ui/core";
import { motion } from "framer-motion";

import medicinasV2 from "./medicinasV2.json";

function Table({ tablaV2 }) {
  console.log(tablaV2);
  const [tabla, setTabla] = useState();

  const [{ basket }, dispatch] = useStateValue();

  console.log("🧺 " + JSON.stringify(basket));

  const addToBasket = (producto) => {
    const amount = producto[3];
    let cantidad = () => (amount ? amount : 1);
    showSnack("success");

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: uuidv4(),
        // id: producto,
        producto: producto[0],
        presentacion: producto[1],
        precio: Number(producto[2]),
        cantidad: Number(cantidad()),
      },
    });
  };

  // const addToBasket = (tableMeta) => {
  //   const amount = tableMeta.rowData[3];
  //   let cantidad = () => (amount ? amount : 1);
  //   showSnack("success");

  //   dispatch({
  //     type: "ADD_TO_BASKET",
  //     item: {
  //       id: uuidv4(),
  //       // id: tableMeta.rowIndex,
  //       producto: tableMeta.rowData[0],
  //       presentacion: tableMeta.rowData[1],
  //       precio: Number(tableMeta.rowData[2]),
  //       cantidad: Number(cantidad()),
  //     },
  //   });
  // };

  const showSnack = (message) => {
    dispatch({
      type: "SHOW_SNACKBAR",
      kind: message,
    });
  };

  useEffect(() => {
    setTabla(medicinas);
  }, []);

  // funcion para hablar con db
  // useEffect(() => {
  //   db.collection("medicinas").onSnapshot((snapshot) => {
  //     console.log( snapshot.docs.map((doc) => doc.data()));
  //     setTabla(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  // talk to bd pt 2
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await db.collection("medicinas").get();
  //     setTablaV2(data.docs.map((doc) => doc.data()));
  //     console.log("triggered 👽");
  //   };
  //   fetchData();
  // }, []);
  // function to change the header color
  function getMuiTheme() {
    return createMuiTheme({
      overrides: {
        MuiTableCell: {
          head: {
            backgroundColor: "#057c8c !important",
            color: "#ffffff",
          },
        },
        // in case footer needs to be overriden
        MuiTablePagination: {
          root: {
            //color: "red",
            //position: "absolute",
            // left: "1.5rem",
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
            <IconButton
              onClick={() => {
                addToBasket(tableMeta.rowData);
              }}
            >
              <ShoppingBasketIcon style={{ color: "#3796a3" }} />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
    searchOpen: true,
    searchPlaceholder: "Digite acá su busqueda",
    selectableRows: "multiple",
    selectableRowsHideCheckboxes: true,
    selectableRowsHeader: false,
    enableNestedDataAccess: ".",
    pagination: true,
    fixedHeader: true,
    sortOrder: {
      name: "Producto",
      direction: "asc",
    },
    // this is to change localization
    textLabels: {
      body: {
        noMatch: "Disculpe, no se encontró nada con su descripción",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por: ${column.label}`,
      },
      pagination: {
        next: "Siguiente pagina",
        previous: "Pagina anterior",
        rowsPerPage: "",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        viewColumns: "Ver/Ocultar Columnas",
        filterTable: "Filter Table",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Ver/Ocultar Columnas",
      },
    },
  };

  const pageVariants = {
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "-100vw",
    },
  };
  const pageTransition = {
    type: "linear",
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="mainTable">
        <div className="table">
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable data={tablaV2} columns={columns} options={options} />
          </MuiThemeProvider>
        </div>
      </div>
    </motion.div>
  );
}

export default Table;
