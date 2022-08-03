import React from "react";
import classes from "./CheckoutForm.module.css";

function CheckoutForm(props) {
  const submitCheckoutFormHandler = (event) => {
    event.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={submitCheckoutFormHandler}>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="Your name..."
          className={classes.input}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          id="lname"
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

        <div className={classes.actions}>
          <button type="button" className={classes.button}>
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
