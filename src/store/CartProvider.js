import React, { useReducer } from "react";
import CartContext from "./cart-context";
import cart from "../components/Cart/Cart/Cart";

const ACTIONS = {
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
};

const initialCartState = {
  cartItems: [],
  totalAmount: 0,
};

const cartReducer = (state = initialCartState, action) => {
  if (action.type === ACTIONS.ADD_ITEM_TO_CART) {
    const updatedTotalAmount =
      state.totalAmount +
      action.payload.item.price * action.payload.item.amount;
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.payload.item.id;
    });

    const existingCartItem = state.cartItems[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.item.amount,
      };
      updatedItems = [...state.cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.cartItems.concat(action.payload.item);
    }
    return {
      cartItems: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === ACTIONS.REMOVE_ITEM_FROM_CART) {
    const existingCartItemIndex = state.cartItems.findIndex((item) => {
      return item.id === action.payload.id;
    });

    const existingItem = state.cartItems[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    if (!existingItem) {
      return;
    }
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.cartItems.filter((item) => {
        return item.id !== action.payload.id;
      });
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      cartItems: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState,
    () => {
      return initialCartState;
    }
  );

  const isItemValid = (item) => {
    // Check for valid data
    if (!item) return false;
    if (!item.id) return false;
    if (!(item.name.trim().length > 0)) return false;
    if (!(item.description.trim().length > 0)) return false;
    if (+item.price < 0.01) return false;
    return true;
  };

  const addItemToCartHandler = (itemToAdd) => {
    // Check for valid data
    if (!isItemValid(itemToAdd)) {
      throw new Error("Invalid item data received...");
    }
    dispatchCartAction({type: ACTIONS.ADD_ITEM_TO_CART, payload: {item: itemToAdd}});
  };

  const removeItemFromCartHandler = (idOfItemToBeRemoved) => {
    dispatchCartAction({type: ACTIONS.REMOVE_ITEM_FROM_CART, payload: {id: idOfItemToBeRemoved}});
  };

  const cartContext = {
    cartItems: cartState.cartItems,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider
      value={cartContext}
    >
      {children}
    </CartContext.Provider>
  );
};
