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
            .addClass("delete-ingredient button is-danger")
            .attr("data-user", userId)
            .attr("data-name", ingredient.name);

          watchlistItem.text(ingredient.name).append(ingredientDelBtn);

          $("#watchlist").append(watchlistItem);
        });
      });
    });
});
