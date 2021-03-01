$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $.get("/api/allmeals").then(data => {
    console.log(data);
    const lastMeal = data.slice(0, 1);
    console.log("lastMeal", lastMeal);

    console.log(data[0].Ingredients[0].name);
    const meal = lastMeal.slice(0, 1);

    console.log(meal[0].Ingredients.length);
    for (let i = 0; i < meal[0].Ingredients.length; i++) {
      console.log("is this it", meal[0].Ingredients[i].name);
      const ingredientEl = $("<h4>").addClass("title is-4");
      const newIngredient = ingredientEl.text(meal[0].Ingredients[i].name);

      $("#latest-meal").append(newIngredient);
    }
  });
});
