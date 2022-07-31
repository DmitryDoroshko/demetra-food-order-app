import React, {useContext, useRef} from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";
import CartContext from "../../../store/cart-context";

function MealItemForm({id, name, price}) {
  const cartContext = useContext(CartContext);

  const mealItemRef = useRef();

  function mealItemFormSubmitHandler(event) {
    event.preventDefault();

    const itemToAddToCart = {
      id: id,
      name: name,
      amount: +mealItemRef.current.value,
      price: price,
    };
  }

  return (
    <form className={classes.form} onSubmit={mealItemFormSubmitHandler}>
      <Input
        ref={mealItemRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "100",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
}

export default MealItemForm;
