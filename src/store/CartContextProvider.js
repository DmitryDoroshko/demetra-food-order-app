import React, { useReducer } from "react";
import CartContext from "./cart-context";

const ACTIONS = {
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
};

const initialCartState = {
  cartItems: [],
  totalPriceForItems: 0,
};

const cartReducer = (state = initialCartState, action) => {
  // Add Item To Cart
  if (action.type === ACTIONS.ADD_ITEM_TO_CART) {
    const existingCartItemIndex = state.cartItems.findIndex((item) => {
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

    const updatedTotalPriceForItems =
      state.totalPriceForItems +
      action.payload.item.price * action.payload.item.amount;

    return {
      cartItems: updatedItems,
      totalPriceForItems: updatedTotalPriceForItems,
    };
  }

  // Remove Item From Cart
  if (action.type === ACTIONS.REMOVE_ITEM_FROM_CART) {
    const existingCartItemIndex = state.cartItems.findIndex((item) => {
      return item.id === action.payload.id;
    });

    const existingItem = state.cartItems[existingCartItemIndex];

    if (!existingItem) {
      return;
    }
    const updatedTotalPriceForItems =
      state.totalPriceForItems - existingItem.price;
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
      totalPriceForItems: updatedTotalPriceForItems,
    };
  }

  // By default return current state snapshot
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
    if (item == null) return false;
    if (item.id == null) return false;
    if (item.name.trim().length === 0) return false;
    if (item.description.trim().length === 0) return false;
    return +item.price >= 0.01;
  };

  const addItemToCartHandler = (itemToAdd) => {
    // Check for valid data
    if (!isItemValid(itemToAdd)) {
      throw new Error("Invalid item data received...");
    }
    dispatchCartAction({
      type: ACTIONS.ADD_ITEM_TO_CART,
      payload: { item: itemToAdd },
    });
  };

  const removeItemFromCartHandler = (idOfItemToBeRemoved) => {
    dispatchCartAction({
      type: ACTIONS.REMOVE_ITEM_FROM_CART,
      payload: { id: idOfItemToBeRemoved },
    });
  };

  const cartContext = {
    cartItems: cartState.cartItems,
    totalPriceForItems: cartState.totalPriceForItems,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
