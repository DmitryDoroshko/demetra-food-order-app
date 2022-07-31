import classes from "./CartItem.module.css";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const CartItem = ({ id, price, name, amount, description }) => {
  const cartContext = useContext(CartContext);
  const priceNormalized = `$${price.toFixed(2)}`;

  const itemToAdd = {
    id,
    price,
    name,
    amount: 1,
    description,
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{priceNormalized}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={() => cartContext.removeItem(id)}>−</button>
        <button onClick={() => cartContext.addItem(itemToAdd)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
