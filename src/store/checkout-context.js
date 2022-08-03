import React from "react";

const CheckoutContext = React.createContext({
  completeCheckout: (userInfo, mealsToOrder) => {},
  userInfo: {
    country: "",
    city: "",
    name: "",
    postalCode: "",
    street: "",
  },
  mealsToOrder: [],
});

export default CheckoutContext;