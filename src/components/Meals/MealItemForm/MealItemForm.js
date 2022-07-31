import React, { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";

function MealItemForm({ id, onAddToCart}) {
  const mealItemRef = useRef();

  function mealItemFormSubmitHandler(event) {
    event.preventDefault();
    const amountToAdd = +mealItemRef.current.value;
    onAddToCart(amountToAdd);
    // Reset the form's item value to 1 by default
    mealItemRef.current.value = "1";
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
