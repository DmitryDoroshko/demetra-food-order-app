import React from "react";
import classes from "./CheckoutForm.module.css";
import useInput from "../../hooks/use-input";

const isTextValid = (text) => {
  return text.trim().length > 0;
};

function CheckoutForm() {
  const {
    enteredValue: enteredFirstName,
    isInputValid: isEnteredFirstNameInputValid,
    hasError: enteredFirstNameHasError,
    valueChangeHandler: enteredFirstNameChangeHandler,
    reset: resetEnteredFirstName,
    inputBlurHandler: enteredFirstNameInputBlurHandler,
  } = useInput(isTextValid);

  const {
    enteredValue: enteredLastName,
    isInputValid: isEnteredLastNameInputValid,
    hasError: enteredLastNameHasError,
    valueChangeHandler: enteredLastNameChangeHandler,
    reset: resetEnteredLastName,
    inputBlurHandler: enteredLastNameInputBlurHandler,
  } = useInput(isTextValid);

  const submitCheckoutFormHandler = (event) => {
    event.preventDefault();
    resetEnteredFirstName();
    resetEnteredLastName();
  };

  let isFormValid = true;

  if (!isEnteredFirstNameInputValid && !isEnteredLastNameInputValid) {
    isFormValid = false;
  }

  const classesForFirstName = `${classes.controls} ${
    !isEnteredFirstNameInputValid && classes.invalid
  }`;

  const classesForLastName = `${classes.controls} ${
    !isEnteredLastNameInputValid && classes.invalid
  }`;

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={submitCheckoutFormHandler}>
        <div className={classesForFirstName}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Your name..."
            className={classes.input}
            value={enteredFirstName}
            onChange={enteredFirstNameChangeHandler}
            onBlur={enteredFirstNameInputBlurHandler}
          />
          {enteredFirstNameHasError && (
            <p className={classes.textError}>Invalid first name...</p>
          )}
        </div>

        <div className={classesForLastName}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Your last name..."
            className={classes.input}
            value={enteredLastName}
            onChange={enteredLastNameChangeHandler}
            onBlur={enteredLastNameInputBlurHandler}
          />
          {enteredLastNameHasError && (
            <p className={classes.textError}>Invalid last name...</p>
          )}
        </div>
        <div className={classes.controls}>
          <label htmlFor="country">Country</label>
          <select id="country" name="country" className={classes.select}>
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
            <option value="ukraine">Ukraine</option>
            <option value="poland">Poland</option>
          </select>
        </div>
        <div className={classes.controls}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className={classes.input}
            placeholder="Your city..."
          />
        </div>
        <div className={classes.controls}>
          <label htmlFor="postal-code">Postal code</label>
          <input
            type="number"
            id="postal-code"
            name="postal-code"
            className={classes.input}
            placeholder="Your postal code..."
          />
        </div>
        <div className={classes.controls}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            className={classes.input}
            placeholder="Your street, house, apartment..."
          />
        </div>
        <div className={classes.actions}>
          <button type="button" className={classes["button--cancel"]}>
            Cancel
          </button>
          <button
            type="submit"
            className={classes.button}
            disabled={isFormValid}
          >
            Complete checkout
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
