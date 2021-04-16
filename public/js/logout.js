$(document).ready(() => {
  $(".logOut").on("click", () => {
    $.get("/logout").then(console.log("logout successful"));
  });
});
