let offset = 0;

$(document).ready(() => {
  $("#past-three").hide();
  displayThree(offset);
});

// adds ingredient to watch list
$(".past-meals").on("click", ".add-to-watch", e => {
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

$("#next-three").click(() => {
  offset += 3;
  if (offset >= 3) {
    $("#past-three").show();
  } else {
    $("#past-three").hide();
  }
  displayThree(offset);
});

$("#past-three").click(() => {
  offset -= 3;

  if (offset >= 3) {
    $("#past-three").show();
  } else {
    $("#past-three").hide();
  }

  displayThree(offset);
});

const displayThree = offset => {
  $.get(`/api/allmeals/${offset}`).then(data => {
    console.log(data);
    $("#meal-1").empty();
    $("#meal-2").empty();
    $("#meal-3").empty();
    const meal1 = data.slice(0, 1);
    const meal2 = data.slice(1, 2);
    const meal3 = data.slice(2, 3);

    if (meal1[0]) {
      const date1 = meal1[0].createdAt.slice(0, 10);
      const time1 = meal1[0].createdAt.slice(11, 17);
      console.log("date", time1, date1);

      const dateEl1 = $("<h2>")
        .addClass("title is-2")
        .text(`meal from ${date1} at ${time1}`);
      $("#meal-1").append(dateEl1);
    }

    if (meal2[0]) {
      const date2 = meal2[0].createdAt.slice(0, 10);
      const time2 = meal2[0].createdAt.slice(11, 17);

      const dateEl2 = $("<h2> ")
        .addClass("title is-2")
        .text(`meal from ${date2} at ${time2}`);
      $("#meal-2").append(dateEl2);
    }

    if (meal3[0]) {
      const date3 = meal3[0].createdAt.slice(0, 10);
      const time3 = meal3[0].createdAt.slice(11, 17);

      const dateEl3 = $("<h2> ")
        .addClass("title is-2")
        .text(`meal from ${date3} at ${time3}`);
      $("#meal-3").append(dateEl3);
    }

    for (let i = 0; i < meal1[0].Ingredients.length; i++) {
      console.log("meal1", meal1);
      const ingredientEl = $("<h4>").addClass("title is-4");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-link is-light")
        .attr("data-meal", meal1[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal1[0].Ingredients[i].name);

      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger is-outlined")
        .attr("data-meal", meal1[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal1[0].Ingredients[i].name);

      const newIngredient = ingredientEl
        .text(
          meal1[0].Ingredients[i].name.charAt(0).toUpperCase() +
            meal1[0].Ingredients[i].name.slice(1)
        )
        .append(watchlistBtn)
        .append(ingredientDelBtn);

      $("#meal-1").append(newIngredient);
    }
    let addIngredientBtn = $("<button>")
      .text("Add Ingredient")
      .attr("id", "addBtn")
      .addClass("add-ingredient button is-danger is-outlined")
      .attr(
        "data-meal",
        (dataMeal1 = meal1[0].Ingredients[0].MealIngredients.MealId)
      );
    $("#meal-1").append(addIngredientBtn);

    for (let i = 0; i < meal2[0].Ingredients.length; i++) {
      console.log("is this it", meal2[0].Ingredients[i].name);
      const ingredientEl = $("<h4>").addClass("title is-4");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-link is-light")
        .attr("data-meal", meal2[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal2[0].Ingredients[i].name);

      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger is-outlined")
        .attr("data-meal", meal2[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal2[0].Ingredients[i].name);

      const newIngredient = ingredientEl
        .text(
          meal2[0].Ingredients[i].name.charAt(0).toUpperCase() +
            meal2[0].Ingredients[i].name.slice(1)
        )
        .append(watchlistBtn)
        .append(ingredientDelBtn);

      $("#meal-2").append(newIngredient);
    }

    addIngredientBtn = $("<button>")
      .text("Add Ingredient")
      .addClass("add-ingredient button is-danger is-outlined")
      .attr("data-meal", meal2[0].Ingredients[0].MealIngredients.MealId);
    $("#meal-2").append(addIngredientBtn);

    for (let i = 0; i < meal3[0].Ingredients.length; i++) {
      const ingredientEl = $("<h4>").addClass("title is-4");

      const watchlistBtn = $("<button>")
        .text("Add to Watchlist")
        .addClass("add-to-watch button is-link is-light")
        .attr("data-meal", meal3[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal3[0].Ingredients[i].name);

      const ingredientDelBtn = $("<button>")
        .text("Delete")
        .attr("id", "deleteBtn")
        .addClass("delete-ingredient button is-danger is-outlined")
        .attr("data-meal", meal3[0].Ingredients[i].MealIngredients.MealId)
        .attr("data-name", meal3[0].Ingredients[i].name);

      const newIngredient = ingredientEl
        .text(
          meal3[0].Ingredients[i].name.charAt(0).toUpperCase() +
            meal3[0].Ingredients[i].name.slice(1)
        )
        .append(watchlistBtn)
        .append(ingredientDelBtn);

      $("#meal-3").append(newIngredient);
    }
    addIngredientBtn = $("<button>")
      .text("Add Ingredient")
      .attr("id", "addBtn")
      .addClass("add-ingredient button is-danger is-outlined")
      .attr("data-meal", meal3[0].Ingredients[0].MealIngredients.MealId);
    $("#meal-3").append(addIngredientBtn);
  });
};

// deletes item from past-meals list
$(".past-meals").on("click", ".delete-ingredient", e => {
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
    .then(data => {
      console.log(data);
      deleteMeal(mealID);
    })

    .catch(err => console.error(err));
});

const deleteMeal = mealID => {
  console.log("delteMealID", mealID);
  $.get(`/api/meal/${mealID}`).then(data => {
    if (data.Ingredients.length === 0) {
      const deleteMeal = {
        id: mealID
      };
      fetch("/api/deletemeal", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deleteMeal)
      }).then(displayThree(offset));
    } else {
      displayThree(offset);
    }
  });
};

// function to update meal
$(".past-meals").on("click", ".add-ingredient", e => {
  const mealID = e.target.getAttribute("data-meal");
  console.log(mealID);
  const divId = $(e.target)
    .parent()
    .attr("id");
  $(e.target).remove();
  const addIngredientEl = $("<form>")
    .attr("id", "ingredient-form")
    .append($("<h3/>").text("Add Ingredient:"))
    .append(
      $("<input/>", {
        class: "input addIngredient",
        type: "input"
      })
    )
    .append(
      $("<button/>", {
        type: "submit",
        class: "button is-medium is-link is-light update-meal",
        text: "Update Meal",
        id: `${mealID}`,
        style: "margin-top: 20px"
      })
    );

  $(`#${divId}`).append(addIngredientEl);
});

//update meal when update button clicked
$(".past-meals").on("click", ".update-meal", e => {
  e.preventDefault();
  const mealID = Number(e.target.getAttribute("id"));
  console.log("final", mealID);

  const ingredientName = $(".addIngredient")
    .val()
    .trim()
    .toLowerCase();
  console.log(ingredientName);
  if (ingredientName !== "") {
    $.post("/api/ingredients", {
      id: mealID,
      name: ingredientName
    })
      .then(result => {
        console.log(result);
        displayThree(offset);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  } else {
    alert("Please input an ingredient");
  }
});
