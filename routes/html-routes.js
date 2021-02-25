// Requiring path to so we can use relative routes to our HTML files

const Router = require("express").Router();

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

Router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("members", req.user);
  }
  res.render("signup", req.user);
});

Router.get("/login", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("members", req.user);
  }
  res.render("login", req.user);
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
Router.get("/members", isAuthenticated, (req, res) => {
  res.render("members");
});

module.exports = Router;
