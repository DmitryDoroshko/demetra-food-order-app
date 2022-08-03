import React from "react";
import classes from "./CheckoutForm.module.css";

function CheckoutForm() {
  const submitCheckoutFormHandler = (event) => {
    event.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={submitCheckoutFormHandler}>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Your name..."
          className={classes.input}
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Your last name..."
          className={classes.input}
        />

        <label htmlFor="country">Country</label>
        <select id="country" name="country" className={classes.select}>
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
          <option value="ukraine">Ukraine</option>
          <option value="poland">Poland</option>
        </select>

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          className={classes.input}
          placeholder="Your city..."
        />
        <label htmlFor="postal-code">Postal code</label>
        <input
          type="number"
          id="postal-code"
          name="postal-code"
          className={classes.input}
          placeholder="Your postal code..."
        />

        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          className={classes.input}
          placeholder="Your street, house, apartment..."
        />

        <div className={classes.actions}>
          <button type="button" className={classes["button--cancel"]}>
            Cancel
          </button>
          <button type="submit" className={classes.button}>
            Complete checkout
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
