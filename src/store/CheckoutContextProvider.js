import CheckoutContext from "./checkout-context";
import {useReducer} from "react";

const initialState = {
  userInfo: {
    country: "",
    city: "",
    name: "",
    postalCode: "",
    street: "",
  },
  mealsToOrder: [],
};

const checkoutReducer = (state = initialState, action) => {
  return state;
};

const CheckoutContextProvider = ({children}) => {
  const [checkoutState, dispatchCheckoutAction] = useReducer(checkoutReducer, initialState, () => {
    return initialState;
  });

  const completeCheckoutHandler = (userInfo, mealsToOrder) => {};

  const checkoutValue = {
    completeCheckout: completeCheckoutHandler,
    userInfo: {
      country: "",
      city: "",
      name: "",
      postalCode: "",
      street: "",
    },
    mealsToOrder: [],
  }

  return <CheckoutContext.Provider value={checkoutValue}>

  </CheckoutContext.Provider>;
};

export default CheckoutContextProvider;

