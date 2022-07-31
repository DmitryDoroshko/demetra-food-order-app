import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalPriceForItems: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
