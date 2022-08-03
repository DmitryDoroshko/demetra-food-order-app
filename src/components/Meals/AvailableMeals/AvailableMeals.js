import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import { FIREBASE_API_URL_MEALS } from "../../../utils/constants";

function AvailableMeals() {
  const [mealsFromServer, setMealsFromServer] = useState([]);

  useEffect(() => {
    const fetchMealsFromServer = async () => {
      const response = await fetch(FIREBASE_API_URL_MEALS, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching data from server...");
      }
      const mealsInJson = await response.json();
      const mealsTransformed = [];

      for (const mealsKey in mealsInJson) {
        const meal = {...mealsInJson[mealsKey], id: mealsKey};
        mealsTransformed.push(meal);
      }
      setMealsFromServer(mealsTransformed);
    };
    fetchMealsFromServer();
    console.log({mealsFromServer})
  }, []);

  const mealsList = mealsFromServer.map((meal) => (
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
