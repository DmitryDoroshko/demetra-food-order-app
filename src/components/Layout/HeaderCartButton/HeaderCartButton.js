import React, {useContext} from "react";
import CartIcon from "../../Cart/CartIcon/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = props => {
  const cartContext = useContext(CartContext);

  return <button className={classes.button} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon/>
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{cartContext.cartItems.length}</span>
  </button>
};

export default HeaderCartButton;