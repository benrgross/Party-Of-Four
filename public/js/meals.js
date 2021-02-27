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

$("#create-meal").click(() => {
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
      const mealId = data.id;
      postIngredient(mealId);
    })
    .then(result => console.log(result));

  const ingredientEl = $("<h6></h6>");
  const newIngredient = ingredientEl.text(ingredientName);
  ingredientsList.append(newIngredient);
});

function postIngredient(mealId) {
  const ingredientName = $(".addIngredient").val();
  console.log(ingredientName);
  $.post("/api/ingredients", {
    id: mealId,
    name: ingredientName
  }).then(result => console.log(result));
}
