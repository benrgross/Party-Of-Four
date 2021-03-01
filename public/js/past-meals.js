$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/allmeals").then(data => {
    const last3 = data.slice(0, 3);

    const meal1 = last3.slice(0, 1);
    const meal2 = last3.slice(1, 2);
    const meal3 = last3.slice(2, 3);

    // for (let i = 0; i < last3[0])
    const dataDate1 = meal1[0].createdAt;
    const orderDate1 = dataDate1.substr(0, 10);
    const dateArr1 = orderDate1.split("-");
    dateArr1.push(dateArr1.shift());
    const date1 = dateArr1.join("/");

    const dateEl1 = $("<h2>")
      .addClass("title is-6")
      .text(date1);
    $("#meal-1").append(dateEl1);

    const dataDate2 = meal2[0].createdAt;
    const orderDate2 = dataDate2.substr(0, 10);
    const dateArr2 = orderDate2.split("-");
    dateArr2.push(dateArr2.shift());
    const date2 = dateArr2.join("/");
    console.log("date2", date2);

    const dateEl2 = $("<h2> ")
      .addClass("title is-6")
      .text(date2);
    $("#meal-2").append(dateEl2);

    const dataDate3 = meal3[0].createdAt;
    const orderDate3 = dataDate3.substr(0, 10);
    const dateArr3 = orderDate3.split("-");
    dateArr3.push(dateArr3.shift());
    const date3 = dateArr3.join("/");

    const dateEl3 = $("<h2>")
      .addClass("title is-6")
      .text(date3);
    $("#meal-3").append(dateEl3);

    console.log(meal1[0].Ingredients.length);
    for (let i = 0; i < meal1[0].Ingredients.length; i++) {
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
