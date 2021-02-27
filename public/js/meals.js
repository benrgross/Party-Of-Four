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
  //   $.get(`/api/meals/${userId}`).then(data => {
  $.post("/api/ingredients", {
    id: 1,
    name: ingredientName
  }).then(result => console.log(result));
});
