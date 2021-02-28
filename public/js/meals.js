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
});

function postIngredient(mealId) {
  const ingredientName = $(".addIngredient")
    .val()
    .trim()
    .toLowerCase();
  if (ingredientName !== "") {
    $.post("/api/ingredients", {
      id: mealId,
      name: ingredientName
    })
      .then(result => console.log(result), (window.location.href = "/meals"))
      .then(() => {
        displayToPage(mealId);
      })
      .catch(error => {
        console.error("Error:", error);
        alert(error);
      });
  } else {
    alert("please input an ingredient");
  }
}

$(document).ready(() => {
  $.get("/api/lastmeal").then(data => {
    console.log("data", data);
    for (let i = 0; i < data.Ingredients.length; i++) {
      const ingredientEl = $("<h6>").addClass("title is-6");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-info is-outlined");

      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger")
        .attr("data-meal", data.id)
        .attr("data-name", data.Ingredients[i].name);

      const newIngredient = ingredientEl
        .text(data.Ingredients[i].name)
        .append(watchlistBtn)
        .append(ingredientDelBtn);

      ingredientsList.append(newIngredient);
    }
  });
});

$(".add-to-watch").click(() => {
  console.log("click");
});

$(".ingredients").on("click", ".delete-ingredient", e => {
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
      window.location.href = "/meals";
    })
    .catch(err => console.error(err));
});

// when you load the page you see your last meal
// when you click add ingredient, the div empties.
//the new ingredient is
