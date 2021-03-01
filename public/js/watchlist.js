$(document).ready(() => {
  $.get("/api/user_data")
    .then(data => {
      const userId = data.id;
      return userId;
    })
    .then(userId => {
      console.log(userId);
      $.get("/api/watchlist").then(data => {
        console.log(data);
        console.log(userId);

        const users = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].Users[0]) {
            {
              users.push(data[i]);
            }
          }
        }

        const watchlists = users.filter(user => {
          return user.Users[0].id === userId;
        });
        console.log("watchlists", watchlists);

        watchlists.forEach(ingredient => {
          const watchlistItem = $("<h6>").addClass("title is-6");

          const ingredientDelBtn = $("<button>")
            .text("Delete")
            .attr("id", "deleteBtn")
            .addClass("delete-ingredient button is-danger is-outlined")
            .attr("data-user", userId)
            .attr("data-name", ingredient.name);

          watchlistItem.text(ingredient.name).append(ingredientDelBtn);

          $("#watchlist").append(watchlistItem);
        });
      });
    });

  // function to add ingredient to watchlist page
  const displayToPage = () => {
    $("#watchlist").empty();
    $.get("/api/watchlist").then(data => {
      //loop through array of ingredients and creat elements on the page
      for (let i = 0; i < data.Ingredients.length; i++) {
        const ingredientEl = $("<h6>").addClass("title is-6");

        const ingredientDelBtn = $("<button>")
          .text("Delete")
          .attr("id", "deleteBtn")
          .addClass("delete-ingredient button is-danger is-outlined")
          .attr("data-user", data.id)
          .attr("data-name", data.Ingredients[i].name);

        const newIngredient = ingredientEl
          .text(data.Ingredients[i].name)
          .append(ingredientDelBtn);

        ingredientsList.append(newIngredient);
      }
    });
  };

  // deletes item from watchlist
  $("#watchlist").on("click", ".delete-ingredient", e => {
    const userID = e.target.getAttribute("data-user");
    const deleteName = e.target.getAttribute("data-name");

    const deleteObject = {
      userId: userID,
      name: deleteName
    };
    fetch("/api/deletefromwatchlist", {
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
});
