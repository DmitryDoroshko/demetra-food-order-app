import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../../Cart/CartIcon/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const [itemHasBeenAddedRightNow, setItemHasBeenAddedRightNow] =
    useState(false);

  const cartItemsLength = cartContext.cartItems.reduce(
    (previousValue, currentValue) => {
      return previousValue + currentValue.amount;
    },
    0
  );

  const { cartItems } = cartContext;

  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }
    setItemHasBeenAddedRightNow(true);

    const timeoutIdentifier = setTimeout(() => {
      setItemHasBeenAddedRightNow(false);
    }, 300);

    return () => {
      clearTimeout(timeoutIdentifier);
    };
  }, [cartItems]);

  const classesForButton = `${classes.button} ${
    itemHasBeenAddedRightNow ? classes.bump : ""
  }`;

  return (
    <button className={classesForButton} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsLength}</span>
    </button>
  );
};

export default HeaderCartButton;