const ingredientsList = $(".ingredients");

let userId;
$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    userId = data.id;
  });
});

$("#create-meal").click(userId => {
  console.log(userId);
  console.log("click");
  $.post("/api/meals", {
    userId: userId
  }).catch(error => {
    console.error("Error:", error);
    alert(error);
  });
});

$(".add-ingredient").click(e => {
  e.preventDefault();
  console.log("click");
  console.log(userId);

  const ingredientName = $(".addIngredient").val();
  console.log(ingredientName);
  $.get(`/api/meals/${userId}`)
    .then(data => {
      console.log(data);
      const mealId = data.Meal.id;
      postIngredient(mealId);
    })
    .then(result => console.log(result));

  const newIngredient = $(`<h6>${this.ingredientName}</h6>`);
  ingredientsList.append(newIngredient);
});

function postIngredient(mealId) {
  $.post("/api/ingredients", {
    id: mealId,
    name: ingredientName
  }).then(result => console.log(result));
}
