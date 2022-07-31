import React, {useContext, useState} from "react";

import mealsImage from "../../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";
import CartContext from "../../../store/cart-context";

const Header = ({onShowCart}) => {

  const headerCartClickHandler = () => {
    onShowCart();
  };

  return <React.Fragment>
    <header className={classes.header}>
      <h1>DemetraMeals</h1>
      <HeaderCartButton onClick={headerCartClickHandler}/>
    </header>
    <div className={classes['main-image']}>
      <img src={mealsImage} alt="Delicious meals"/>
    </div>
  </React.Fragment>;
};

export default Header;