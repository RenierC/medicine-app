import React from "react";
import "./Table.css";
import { useStateValue } from "../StateProvider";
import { v4 as uuidv4 } from "uuid";

import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { IconButton, TextField } from "@material-ui/core";
import { motion } from "framer-motion";

//import db from "../firebase";
//import medicinas from "./medicinas.json";
//import medicinasV2 from "./medicinasV2.json";

function Table({ tablaV2 }) {
  //const [tabla, setTabla] = useState();

  const [, dispatch] = useStateValue();

  const addToBasket = (producto) => {
    const amount = producto[3];
    // if the user didn't specifiy quantity default to 1
    let cantidad = () => (amount ? amount : 1);
    showSnack("success");

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: uuidv4(),
        producto: producto[0],
        presentacion: producto[1],
        precio: Number(producto[2]),
        cantidad: Number(cantidad()),
      },
    });
  };

  const showSnack = (message) => {
    dispatch({
      type: "SHOW_SNACKBAR",
      kind: message,
    });
  };
  // uncomment to use local json
  // useEffect(() => {
  //   setTabla(medicinas);
  // }, []);

  // function to override the header and footer
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
        // MuiTablePagination: {
        //   root: {
        //     color: "red",
        //     position: "absolute",
        //     left: "1.5rem",
        //   },
        // },
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
  // variables for the transition animation
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
  // variables for the transition animation

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
