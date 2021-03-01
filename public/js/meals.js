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
  }).then(id => console.log(id));
});

// click event for adding to list of ingredients
$(".add-ingredient").click(e => {
  e.preventDefault();
  console.log("click");
  console.log(userId);
  // get request for most current meal id
  $.get("api/mealId").then(data => {
    const mealId = data.id;
    console.log(data);
    postIngredient(mealId);
    document.getElementById("ingredients-form").reset();
  });
});

// post the ingredient name
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
      .then(result => console.log(result))
      .then(() => {
        displayToPage(mealId);
      })
      .catch(error => {
        console.error("Error:", error);
        alert(error);
      });
  } else {
    alert("Please input an ingredient");
  }
}

// get request for last meal array of ingredients
$(document).ready(() => {
  displayToPage();
});

//function to add ingredient to meal list page
const displayToPage = () => {
  $(".ingredients").empty();
  $.get("/api/lastmeal").then(data => {
    //loop through array of ingredients and creat elements on the page
    for (let i = 0; i < data.Ingredients.length; i++) {
      const ingredientEl = $("<h6>").addClass("title is-6");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-warning")
        .attr("data-meal", data.id)
        .attr("data-name", data.Ingredients[i].name);

      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger is-outlined")
        .attr("data-meal", data.id)
        .attr("data-name", data.Ingredients[i].name);

      const newIngredient = ingredientEl
        .text(data.Ingredients[i].name)
        .append(watchlistBtn)
        .append(ingredientDelBtn);

      ingredientsList.append(newIngredient);
    }
  });
};

// adds ingredient to watch list
$(".ingredients").on("click", ".add-to-watch", e => {
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

// deletes item from ingredient list
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
      displayToPage();
    })
    .catch(err => console.error(err));
});

// when you load the page you see your last meal
// when you click add ingredient, the div empties.
//the new ingredient is
