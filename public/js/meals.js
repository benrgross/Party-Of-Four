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

  $(".addMeal").hide(500);
  $(".ingredientAdd").show(500);

  $.post("/api/meals", {
    id: userId
  }).catch(error => {
    console.error("Error:", error);
    alert(error);
  });
});

let mealId;

// click event for adding to list of ingredients
$(".add-ingredient").click(e => {
  e.preventDefault();
  console.log("click");
  console.log(userId);

  const ingredientName = $(".addIngredient").val();
  console.log(ingredientName);
  $.get(`/api/meals/${userId}`).then(data => {
    console.log(data);
    mealId = data.id;
    postIngredient(mealId);

    const ingredientEl = $("<h6>")
      .addClass("title is-6")
      .attr("data-meal", mealId)
      .attr("data-name", ingredientName);

    const watchlistBtn = $("<button>")
      .text("Add to Watchlist")
      .addClass("add-to-watch button is-warning");

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
  })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error:", error);
      alert(error);
    });
}

// // $("delete-ingredient").click(() => {
//   $.delete(`/api/deletefrommeal`, {
//       le mealID = $(this).attr(data-mealId)
//       let text = $(this).siblings(".text").val();
//       deleteName = $(this).text()
//       id: mealId,
//       name:
//   };
// });
