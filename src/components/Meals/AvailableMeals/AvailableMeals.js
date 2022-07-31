import React from "react";
import { DUMMY_MEALS } from "../../../utils/dummy-meals";
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";

function AvailableMeals(props) {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;