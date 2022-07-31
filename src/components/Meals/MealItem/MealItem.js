import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "../MealItemForm/MealItemForm";
import CartContext from "../../../store/cart-context";

function MealItem({ name, description, price, id }) {
  const cartContext = useContext(CartContext);
  const priceFormatted = `$${price.toFixed(2)}`;

  const addToCartHandler = (amountToAdd) => {
    if (
      typeof amountToAdd !== "number" ||
      amountToAdd < 1 ||
      amountToAdd > 100
    ) {
      return;
    }

    cartContext.addItem({
      id: id,
      name: name,
      description: description,
      amount: amountToAdd,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{priceFormatted}</div>
      </div>
      <div>
        <MealItemForm
          id={id}
          name={name}
          price={price}
          description={description}
          onAddToCart={addToCartHandler}
        />
      </div>
    </li>
  );
}

export default MealItem;
