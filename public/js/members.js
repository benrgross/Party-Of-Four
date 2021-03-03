$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $.get("/api/allmeals").then(data => {
    const lastMeal = data.slice(0, 1);

    const meal = lastMeal.slice(0, 1);

    for (let i = 0; i < meal[0].Ingredients.length; i++) {
      const ingredientEl = $("<h4>").addClass("title is-4");
      const newIngredient = ingredientEl.text(
        meal[0].Ingredients[i].name.charAt(0).toUpperCase() +
          meal[0].Ingredients[i].name.slice(1)
      );

      $("#latest-meal").append(newIngredient);
    }
  });
});
