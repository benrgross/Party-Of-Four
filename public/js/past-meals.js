let offset = 0;

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/allmeals").then(data => {
    const last3 = data.slice(0, 3);

    const meal1 = last3.slice(0, 1);
    const meal2 = last3.slice(1, 2);
    const meal3 = last3.slice(2, 3);

    const dataDate1 = meal1[0].createdAt;
    console.log("created", dataDate1);

    const orderDate1 = dataDate1.substr(0, 10);
    const dateArr1 = orderDate1.split("-");
    dateArr1.push(dateArr1.shift());
    const date1 = dateArr1.join("/");

    const getTime1 = dataDate1
      .substr(11)
      .slice(0, 8)
      .split(":");

    let hour;
    if (Number(getTime1[0] - 5) > 12) {
      hour = (Number(getTime1[0] - 5) - 12).toString();
      getTime1.push("pm");
    } else {
      hour = getTime1[0] - 5;
      getTime1.push("am");
    }

    const time1 = hour + ":" + getTime1[1] + getTime1[3];
    console.log(time1);

    const dateEl1 = $("<h3>")
      .addClass("title is-3")
      .text(date1 + "  " + time1);
    $("#meal-1").append(dateEl1);

    const dataDate2 = meal2[0].createdAt;
    const orderDate2 = dataDate2.substr(0, 10);
    const dateArr2 = orderDate2.split("-");
    dateArr2.push(dateArr2.shift());
    const date2 = dateArr2.join("/");
    console.log("date2", date2);

    const getTime2 = dataDate2
      .substr(11)
      .slice(0, 8)
      .split(":");

    if (Number(getTime2[0] - 5) > 12) {
      hour = (Number(getTime2[0] - 5) - 12).toString();
      getTime2.push("pm");
    } else {
      hour = getTime2[0] - 5;
      getTime2.push("am");
    }

    const time2 = hour + ":" + getTime2[1] + getTime2[3];
    console.log(time2);

    const dateEl2 = $("<h3> ")
      .addClass("title is-3")
      .text(date2 + "  " + time2);
    $("#meal-2").append(dateEl2);

    const dataDate3 = meal3[0].createdAt;
    const orderDate3 = dataDate3.substr(0, 10);
    const dateArr3 = orderDate3.split("-");
    dateArr3.push(dateArr3.shift());
    const date3 = dateArr3.join("/");

    const getTime3 = dataDate3
      .substr(11)
      .slice(0, 8)
      .split(":");

    if (Number(getTime3[0] - 5) > 12) {
      hour = (Number(getTime3[0] - 5) - 12).toString();
      getTime3.push("pm");
    } else {
      hour = getTime3[0] - 5;
      getTime3.push("am");
    }

    const time3 = hour + ":" + getTime3[1] + getTime3[3];

    const dateEl3 = $("<h3>")
      .addClass("title is-3")
      .text(date3 + "  " + time3);
    $("#meal-3").append(dateEl3);

    console.log(meal1[0].Ingredients.length);
    for (let i = 0; i < meal1[0].Ingredients.length; i++) {
      const ingredientEl = $("<h5>").addClass("title is-5");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-link is-light")
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

    for (let i = 0; i < meal2[0].Ingredients.length; i++) {
      console.log("is this it", meal2[0].Ingredients[i].name);
      const ingredientEl = $("<h5>").addClass("title is-5");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-link is-light")
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

    for (let i = 0; i < meal3[0].Ingredients.length; i++) {
      console.log("is this it", meal3[0].Ingredients[i].name);
      const ingredientEl = $("<h5>").addClass("title is-5");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-link is-light")
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

$("#next-three").click(() => {
  offset -= 3;
  a$.get(`/api/allmeals/${offset}`).then(data => console.log(data));
});
