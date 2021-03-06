$(document).ready(() => {
  $.get("/api/user_data")
    .then(data => {
      const userId = data.id;
      return userId;
    })
    .then(userId => {
      $.get("/api/watchlist").then(data => {
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

        watchlists.forEach(ingredient => {
          const dataDate1 = ingredient.createdAt;

          const orderDate1 = dataDate1.substr(0, 10);
          const dateArr1 = orderDate1.split("-");
          dateArr1.push(dateArr1.shift());
          const date1 = dateArr1.join("/");

          const watchlistItem = $("<h4>").addClass("title is-4 ");
          const date = $("<h4>")
            .addClass("title is-4")
            .text(date1);

          const ingredientDelBtn = $("<button>")
            .text("Delete")
            .attr("id", "deleteBtn")
            .addClass("delete-ingredient button is-danger is-outlined")
            .attr("data-user", userId)
            .attr("data-name", ingredient.name);

          watchlistItem
            .text(
              ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)
            )
            .append(date, ingredientDelBtn);

          $("#watchlist").append(watchlistItem);
        });
      });
    });

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
        location.reload("/watchlist");
      })
      .catch(err => console.error(err));
  });
});
