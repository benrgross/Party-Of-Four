const ingredientsList = $(".ingredients");

let userId;
$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    console.log(data);
    userId = data.id;
    console.log(userId);
    return userId;
  });
});
console.log(userId);

// click event for creating a meal
$("#create-meal").click(() => {
  console.log(userId);
  $(".addMeal").toggle();
  $.post("/api/meals", {
    id: userId
  }).then(id => console.log(id));
});

// function getMealId() {
//   $.get("api/mealId").then(data => {
//     const mealID = data.id;
//     console.log(data);
//   });
// }

// click event for adding to list of ingredients
$(".add-ingredient").click(e => {
  e.preventDefault();
  console.log("click");
  console.log(userId);

  const ingredientName = $(".addIngredient").val();
  console.log(ingredientName);
  $.get("api/mealId").then(data => {
    const mealId = data.id;
    console.log(data);
    postIngredient(mealId);

    const ingredientEl = $("<h6>")
      .addClass("title is-6")
      .attr("data-meal", mealId)
      .attr("data-name", ingredientName);

    const watchlistBtn = $("<button>")
      .text("Add to Watchlist")
      .addClass("add-to-watch button is-info is-outlined");

    const ingredientDelBtn = $("<button>")
      .text("Delete")
      .addClass("delete-ingredient button is-danger");

    const newIngredient = ingredientEl
      .text(ingredientName)
      .append(watchlistBtn)
      .append(ingredientDelBtn);

    ingredientsList.append(newIngredient);
  });
  //.then(mealId => console.log(mealId));
});

// send ingredient to api route
function postIngredient(mealId) {
  const ingredientName = $(".addIngredient")
    .val()
    .trim()
    .toLowerCase();
  console.log(ingredientName);
  $.post("/api/ingredients", {
    id: mealId,
    name: ingredientName
  }).catch(error => {
    console.error("Error:", error);
    alert(error);
  });
}

$(".delete-ingredient").click(() => {
  console.log("click");
  const mealID = $(this).attr("data-mealId");
  const deleteName = $(this)
    .siblings(".text")
    .val();
  console.log("mealID", mealID);
  console.log("deleteName", deleteName);
  $.delete("/api/deletefrommeal", {
    id: mealID,
    name: deleteName
  });
});
