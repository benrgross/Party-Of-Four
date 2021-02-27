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
  console.log("click");
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
  $.get(`/api/meals/${userId}`)
    .then(data => {
      console.log(data);
      mealId = data.id;
      postIngredient(mealId);
    })
    .then(result => console.log(result));

  const ingredientEl = $("<h6>")
    .addClass("title is-6")
    .attr("data-meal", mealId);

  const ingredientDelBtn = $("<button>")
    .text("Delete")
    .addClass("delete-ingredient button is-danger");

  const newIngredient = ingredientEl
    .text(ingredientName)
    .append(ingredientDelBtn);

  ingredientsList.append(newIngredient);
});

// send ingredient to api route
function postIngredient(mealId) {
  const ingredientName = $(".addIngredient").val();
  console.log(ingredientName);
  $.post("/api/ingredients", {
    id: mealId,
    name: ingredientName
  }).then(result => console.log(result));
}
