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

  $.post("/api/meals", {
    userId: userId
  }).catch(error => {
    console.error("Error:", error);
    alert(error);
  });
});

let mealId;
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
    .then(mealId => console.log(mealId));

  const ingredientEl = $("<h6>");
  const newIngredient = ingredientEl.text(ingredientName);
  ingredientsList.append(newIngredient);
});

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
