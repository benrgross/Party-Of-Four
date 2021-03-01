$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/allmeals").then(data => {
    console.log(data);
    const last3 = data.slice(0, 3);
    console.log("last3", last3);

    console.log(data[0].Ingredients[0].name);
    const meal1 = last3.slice(0, 1);
    const meal2 = last3.slice(1, 2);
    const meal3 = last3.slice(2, 3);

    console.log("meall1", meal3);

    console.log(meal1[0].Ingredients.length);
    for (let i = 0; i < meal1[0].Ingredients.length; i++) {
      console.log("is this it", meal1[0].Ingredients[i].name);
      const ingredientEl = $("<h6>").addClass("title is-6");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-warning")
        .attr("data-meal", meal1[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal1[0].Ingredients[i].name);

      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger is-outlined")
        .attr("data-meal", meal1[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal1[0].Ingredients[i].name);

      const newIngredient = ingredientEl
        .text(meal1[0].Ingredients[i].name)
        .append(watchlistBtn)
        .append(ingredientDelBtn);

      $("#meal-1").append(newIngredient);
    }

    console.log(meal2[0].Ingredients.length);
    for (let i = 0; i < meal2[0].Ingredients.length; i++) {
      console.log("is this it", meal2[0].Ingredients[i].name);
      const ingredientEl = $("<h6>").addClass("title is-6");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-warning")
        .attr("data-meal", meal2[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal2[0].Ingredients[i].name);

      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger is-outlined")
        .attr("data-meal", meal2[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal2[0].Ingredients[i].name);

      const newIngredient = ingredientEl
        .text(meal2[0].Ingredients[i].name)
        .append(watchlistBtn)
        .append(ingredientDelBtn);

      $("#meal-2").append(newIngredient);
    }

    console.log(meal3[0].Ingredients.length);
    for (let i = 0; i < meal3[0].Ingredients.length; i++) {
      console.log("is this it", meal3[0].Ingredients[i].name);
      const ingredientEl = $("<h6>").addClass("title is-6");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-warning")
        .attr("data-meal", meal3[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal3[0].Ingredients[i].name);

      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger is-outlined")
        .attr("data-meal", meal3[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal3[0].Ingredients[i].name);

      const newIngredient = ingredientEl
        .text(meal3[0].Ingredients[i].name)
        .append(watchlistBtn)
        .append(ingredientDelBtn);

      $("#meal-3").append(newIngredient);
    }
  });
});

// adds ingredient to watch list
$(".past-meals").on("click", ".add-to-watch", e => {
  $.get("/api/user_data").then(data => {
    const watchIngredient = e.target.getAttribute("data-name");
    $.post("/api/watchlist", {
      userId: data.id,
      name: watchIngredient
    }).then(result => {
      console.log(result);
      alert(watchIngredient + " added to your Watchlist!");
    });
  });
});

// deletes item from past-meals list
$(".past-meals").on("click", ".delete-ingredient", e => {
  const mealID = e.target.getAttribute("data-meal");
  const deleteName = e.target.getAttribute("data-name");

  const deleteObject = {
    mealId: mealID,
    name: deleteName
  };
  fetch("/api/deletefrommeal", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(deleteObject)
  })
    .then(() => {
      location.reload();
    })
    .catch(err => console.error(err));
});
