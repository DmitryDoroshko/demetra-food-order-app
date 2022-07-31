import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";

function MealItemForm({ id, onAddToCart }) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const mealItemRef = useRef();

  function mealItemFormSubmitHandler(event) {
    event.preventDefault();

    const mealItemValueInString = mealItemRef.current.value;
    const mealItemValueInNumber = +mealItemValueInString;

    if (
      mealItemValueInString.trim().length === 0 ||
      mealItemValueInNumber < 1 ||
      mealItemValueInNumber > 100
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(mealItemValueInNumber);
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
      {!amountIsValid && <p>Please enter a valid amount (more than 0 and less than 101)</p>}
    </form>
  );
}

export default MealItemForm;
