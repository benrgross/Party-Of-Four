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

Router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

Router.get("/members", isAuthenticated, (req, res) => {
  res.render("members");
});

Router.get("/meals", isAuthenticated, (req, res) => {
  res.render("meals", res);
});

Router.get("/past-meals", isAuthenticated, (req, res) => {
  res.render("past-meals", res);
});

Router.get("/watchlist", isAuthenticated, (req, res) => {
  res.render("watchlist", res);
});

Router.get("/healthychoices", isAuthenticated, (req, res) => {
  res.render("healthychoices", res);
});

Router.get("/nutrition", isAuthenticated, (req, res) => {
  res.render("nutrition", res);
});

module.exports = Router;
