import React, {Fragment} from 'react';
import MealsSummary from "../MealsSummary/MealsSummary";
import AvailableMeals from "../AvailableMeals/AvailableMeals";

function Meals(props) {
  return (
    <Fragment>
      <MealsSummary/>
      <AvailableMeals/>
    </Fragment>
  );
}

export default Meals;