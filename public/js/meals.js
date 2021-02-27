// dependencies
const createMealBtn = document.getElementById("create-meal");
// const addIngredientBtn = document.getElementsByClassName("add-ingredient");
// --- date on the form
// -- the time on the form
// --- array of ingredients
// --- IngredientsEl = document.querySelectorAll("data-ingredient")

//When user clicks add ingredient button, a new input is added to the page with data-ingredient value.

//grab the value of the date and store it in a variable
//grab the value of the time and store it in a variable

// user is able to input time date and ingredient
// --- add ingredient one by one
// -- when user clicks add ingredient it triggers api to findOrCreate   meal then meal.addIngredient.

// Function
const createMeal = event => {
  event.preventDefault();
  console.log("hello");
};

// const addIngredient = () => {
//   console.log("hello");
// };

// Events
createMealBtn.addEventListener("click", createMeal());
// addIngredientBtn.addEventListener("click", addIngredient());
