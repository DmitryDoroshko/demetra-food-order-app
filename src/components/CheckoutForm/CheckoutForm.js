import React, { useState } from "react";
import classes from "./CheckoutForm.module.css";
import useInput from "../../hooks/use-input";
import { FIREBASE_API_URL_ORDERS } from "../../utils/constants";

const isTextValid = (text) => {
  return text.trim().length > 0;
};

const isPostalCodeValid = (postal) => {
  if (typeof postal === "number") {
    return postal.toString().trim().length === 5;
  }
  if (typeof postal === "string") {
    return postal.trim().length === 5;
  }
  return false;
};

function CheckoutForm({ onCancel, mealsToBeOrderedData }) {
  const [successOrdering, setSuccessOrdering] = useState(false);

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

  const {
    enteredValue: enteredCountry,
    isInputValid: isEnteredCountryInputValid,
    hasError: enteredCountryHasError,
    valueChangeHandler: enteredCountryChangeHandler,
    reset: resetEnteredCountry,
    inputBlurHandler: enteredCountryInputBlurHandler,
  } = useInput(isTextValid);

  const {
    enteredValue: enteredCity,
    isInputValid: isEnteredCityInputValid,
    hasError: enteredCityHasError,
    valueChangeHandler: enteredCityChangeHandler,
    reset: resetEnteredCity,
    inputBlurHandler: enteredCityInputBlurHandler,
  } = useInput(isTextValid);

  const {
    enteredValue: enteredPostalCode,
    isInputValid: isEnteredPostalCodeInputValid,
    hasError: enteredPostalCodeHasError,
    valueChangeHandler: enteredPostalCodeChangeHandler,
    reset: resetEnteredPostalCode,
    inputBlurHandler: enteredPostalCodeInputBlurHandler,
  } = useInput(isPostalCodeValid);

  const {
    enteredValue: enteredStreet,
    isInputValid: isEnteredStreetInputValid,
    hasError: enteredStreetHasError,
    valueChangeHandler: enteredStreetChangeHandler,
    reset: resetEnteredStreet,
    inputBlurHandler: enteredStreetInputBlurHandler,
  } = useInput(isTextValid);

  const submitCheckoutFormHandler = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const checkoutFormData = {
      name: `${enteredFirstName} ${enteredLastName}`,
      country: enteredCountry,
      city: enteredCity,
      postalCode: enteredPostalCode,
      street: enteredStreet,
      meals: { ...mealsToBeOrderedData },
    };

    const response = await fetch(FIREBASE_API_URL_ORDERS, {
      body: JSON.stringify(checkoutFormData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Something went wrong sending your data...");
    }

    setSuccessOrdering(true);

    resetEnteredFirstName();
    resetEnteredLastName();
    resetEnteredCountry();
    resetEnteredCity();
    resetEnteredPostalCode();
    resetEnteredStreet();
  };

  let isFormValid = true;

  if (
    !isEnteredFirstNameInputValid ||
    !isEnteredLastNameInputValid ||
    !isEnteredCountryInputValid ||
    !isEnteredCityInputValid ||
    !isEnteredPostalCodeInputValid ||
    !isEnteredStreetInputValid
  ) {
    isFormValid = false;
  }

  const classesForFirstName = `${classes.controls} ${
    !isEnteredFirstNameInputValid && classes.invalid
  }`;

  const classesForLastName = `${classes.controls} ${
    !isEnteredLastNameInputValid && classes.invalid
  }`;

  const classesForCountry = `${classes.controls} ${
    !isEnteredCountryInputValid && classes.invalid
  }`;

  const classesForCity = `${classes.controls} ${
    !isEnteredCityInputValid && classes.invalid
  }`;

  const classesForPostalCode = `${classes.controls} ${
    !isEnteredPostalCodeInputValid && classes.invalid
  }`;

  const classesForStreet = `${classes.controls} ${
    !isEnteredStreetInputValid && classes.invalid
  }`;

  if (successOrdering) {
    return (
      <div className={classes.actions}>
        <p>Successfully ordered!</p>
        <button
          type="button"
          className={classes["button--cancel"]}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    );
  }
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
        <div className={classesForCountry}>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            className={classes.select}
            onChange={enteredCountryChangeHandler}
            value={enteredCountry}
            onBlur={enteredCountryInputBlurHandler}
            placeholder="Your country..."
          />
          {enteredCountryHasError && (
            <p className={classes.textError}>Invalid country...</p>
          )}
        </div>
        <div className={classesForCity}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className={classes.input}
            placeholder="Your city..."
            value={enteredCity}
            onChange={enteredCityChangeHandler}
            onBlur={enteredCityInputBlurHandler}
          />
          {enteredCityHasError && (
            <p className={classes.textError}>Invalid city...</p>
          )}
        </div>

        <div className={classesForPostalCode}>
          <label htmlFor="postal-code">Postal code</label>
          <input
            type="number"
            id="postal-code"
            name="postal-code"
            className={classes.input}
            placeholder="Your postal code..."
            value={enteredPostalCode}
            onChange={enteredPostalCodeChangeHandler}
            onBlur={enteredPostalCodeInputBlurHandler}
          />
          {enteredPostalCodeHasError && (
            <p className={classes.textError}>
              Invalid postal code (must be 5 digits long)...
            </p>
          )}
        </div>
        <div className={classesForStreet}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            className={classes.input}
            placeholder="Your street, house, apartment..."
            onChange={enteredStreetChangeHandler}
            value={enteredStreet}
            onBlur={enteredStreetInputBlurHandler}
          />
          {enteredStreetHasError && (
            <p className={classes.textError}>Invalid street...</p>
          )}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes["button--cancel"]}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={classes.button}
            disabled={!isFormValid}
          >
            Complete checkout
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
