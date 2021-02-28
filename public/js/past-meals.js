$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/allmeals").then(data => {
    console.log(data);
    const last3 = data.slice(0, 3).map(meal => {
      console.log(meal.Ingredients);
      return meal.Ingredients;
    });

    const meal1 = last3.slice(0, 1);
    const meal2 = last3.slice(1, 2);
    const meal3 = last3.slice(2, 3);
    console.log(meal1, meal2, meal3);

    meal1.forEach(ingredient => {
      const ingredientEl = $("<h6>").addClass("title is-6");
      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-warning")
        .attr("data-meal", ingredient.MealIngredients.MealId)
        .attr("data-name", ingredient.name);
      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger is-outlined")
        .attr("data-meal", ingredient.MealIngredients.MealId)
        .attr("data-name", ingredient.name);
      const newIngredient = ingredientEl
        .text(ingredient.name)
        .append(watchlistBtn)
        .append(ingredientDelBtn);
      $("#meal-1").append(newIngredient);
    });
  });
});

//  for (let i = 0; i < data.Ingredients.length; i++) {
//         const ingredientEl = $("<h6>").addClass("title is-6");
//         const watchlistBtn = $("<button>")
//           .text("Add to Watchlist")
//           .addClass("add-to-watch button is-warning")
//           .attr("data-meal", data.id)
//           .attr("data-name", data.Ingredients[i].name);
//         const ingredientDelBtn = $("<button>")
//           .text("Delete")
//           .attr("id", "deleteBtn")
//           .addClass("delete-ingredient button is-danger is-outlined")
//           .attr("data-meal", data.id)
//           .attr("data-name", data.Ingredients[i].name);
//         const newIngredient = ingredientEl
//           .text(data.Ingredients[i].name)
//           .append(watchlistBtn)
//           .append(ingredientDelBtn);
//         ingredientsList.append(newIngredient);
