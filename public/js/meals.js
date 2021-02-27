// dependencies
const createMealBtn = document.getElementById("create-meal");
const addIngredientBtn = document.getElementsByClassName("add-ingredient");
const ingredientEl = document
  .querySelectorAll(".adIngredient")
  .values.trim()
  .toLowerCase();

// Events
createMealBtn.addEventListener("click", createMeal());
addIngredientBtn.addEventListener("click", addIngredient());

// get user id and create new meal with user assosiation
const createMeal = () => {
  $.get("/api/user_data").then(data => {
    const newMeal = {
      userId: data.id
    };
    fetch("/api/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMeal)
    });
  });
};

// get meal id and create new igredient to sent to API
const addIngredient = () => {
  $.get("/api/meals").then(data => {
    const newIngredient = {
      mealId: data.Meal.id,
      name: ingredientEl
    };
    fetch("/api/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newIngredient)
    });
  });
};
