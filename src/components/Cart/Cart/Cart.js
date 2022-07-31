import React, {useContext} from "react";
import classes from "./Cart.module.css";
import Modal from "../../UI/Modal/Modal";
import CartItem from "../CartItem/CartItem";
import CartContext from "../../../store/cart-context";

function Cart({onClose}) {
  const cartContext = useContext(CartContext);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.cartItems.map((item) => (
        <CartItem key={item.id}>{item.name}</CartItem>
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>${cartContext.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>Close</button>
        <button className={classes["button"]}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
