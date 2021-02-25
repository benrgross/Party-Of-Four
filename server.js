// Requiring necessary npm packages
const express = require("express");
const app = express();
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

//require handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Creating express app and configuring middleware needed for authentication

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes"));

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
  });
});
