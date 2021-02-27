document.addEventListener("DOMContentLoaded", userId => {
  console.log("DOM loaded! 🚀");

  // dependencies
  //   const createMealBtn = document.getElementById("create-meal");
  //   const addIngredientBtn = document.getElementById("add-ingredient");
  //   const ingredientEl = document.querySelectorAll(".addIngredient");
  //   //   .value.trim()
  //   .toLowerCase();

  // Events
  //   createMealBtn.addEventListener("click", createMeal());
  //   addIngredientBtn.addEventListener("click", addIngredient());
  //   console.log(userId);

  $("#create-meal").click(() => {
    console.log(userId);
    console.log("click");
    $.get("/api/user_data").then(data => {
      console.log(data);
      const userId = data.id;
      $.post("/api/meals", {
        userId: userId
      }).catch(error => {
        console.error("Error:", error);
        alert(error);
      });
    });
  });

  $(".add-ingredient").click(e => {
    e.preventDefault();
    console.log("click");
    ingredientName = $("addIngredient");
    $.get(`/api/meals/${userId}`).then(data => {
      $.post("/api/ingredients", {
        mealId: data.Meal.id,
        name: ingredientName
      });
    });
  });
});
