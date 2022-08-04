import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../../UI/Modal/Modal";
import CartItem from "../CartItem/CartItem";
import CartContext from "../../../store/cart-context";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";

function Cart({ onClose }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showOrderButtons, setShowOrderButtons] = useState(true);
  const cartContext = useContext(CartContext);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.cartItems.map((item) => (
        <CartItem
          id={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          description={item.description}
        />
      ))}
    </ul>
  );

  let totalPrice = cartContext.totalPriceForItems.toFixed(2);

  if (totalPrice === "-0.00") {
    totalPrice = "0.00";
  }

  const showCheckoutFormHandler = () => {
    setShowCheckoutForm(true);
    setShowOrderButtons(false);
  };

  const cancelCheckoutFormHandler = () => {
    setShowCheckoutForm(false);
    setShowOrderButtons(true);
  };

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{`$${totalPrice}`}</span>
      </div>
      {showCheckoutForm && (
        <CheckoutForm
          onCancel={cancelCheckoutFormHandler}
          mealsToBeOrderedData={cartContext.cartItems}
        />
      )}
      {showOrderButtons && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={onClose}>
            Close
          </button>
          <button
            className={classes["button"]}
            onClick={showCheckoutFormHandler}
          >
            Order
          </button>
        </div>
      )}
    </Modal>
  );
}

export default Cart;
