const ingredientWatch = [];

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

        // const users = data.filter(data => {
        //   return data.Users !== [];
        // });
        let users;
        data.forEach(element => {
          if (element.Users !== []) {
            users = element.User;
            return users;
          }
        });
        console.log(users);
        // const users = data.filter(value => data.Users.keys(value).length !== 0);
        // console.log(users);
        // data.forEach(ingredient => {
        //   if (data.Users.id === userId) {
        //     const watchlistItem = $("<h6>").addClass("title is-6");

        //     const ingredientDelBtn = $("<button>")
        //       .text("Delete")
        //       .attr("id", "deleteBtn")
        //       .addClass("delete-ingredient button is-danger")
        //       .attr("data-user", userId)
        //       .attr("data-name", ingredient.name);

        //     watchlistItem.text(ingredient.name).append(ingredientDelBtn);

        //     $("#watchlist").append(watchlistItem);
        //   }
        // });
      });
    });
});
