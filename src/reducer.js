export const initialState = {
  basket: [],
};

export const totalCesta = (basket) =>
  basket?.reduce((total, item) => item.precio * item.cantidad + total, 0);

const reducer = (state, action) => {
  console.log(action);

  // searches the current product
  const index = state.basket.findIndex(
    (basketItem) => basketItem.id === action.id
  );

  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];

      index >= 0 ? newBasket.splice(index, 1) : console.log("cant remove 🤷🏽‍♂️");

      return {
        ...state,
        basket: newBasket,
      };

    case "UPDATE_QUANTITY":
      let updatedBasket = [...state.basket];

      updatedBasket[index].cantidad = action.cantidad;

      return {
        ...state,
        basket: updatedBasket,
      };

    default:
      return state;
  }
};

export default reducer;
