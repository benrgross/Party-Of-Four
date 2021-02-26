// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Router = require("express").Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
Router.route("/api/login").post(passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  console.log(req.user.email);
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
Router.route("/api/signup").post((req, res) => {
  console.log(req.body.email);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route for logging user out
Router.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
Router.route("/api/user_data").get((req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea

    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

Router.route("/api/meals").get((req, res) => {
  db.Meal.findAll({
    include: [{ model: db.Ingredient, attributes: ["id", "name"] }]
  }).then(ingredient => {
    return res.json(ingredient);
  });
});

// creates a meal when user submits
Router.post("/api/meals", async (req, res) => {
  const meal = await db.Meal.create({});

  res.json(meal);
});

//associates input ingredient with meal id in meal ingredient table upon submitting ingredient input
Router.post("/api/ingredients", async (req, res) => {
  const meal = await db.Meal.findOne({
    where: {
      id: req.body.id
    }
  });

  const ingredient = await db.Ingredient.findOrCreate({
    defaults: { name: req.body.name },
    where: { name: req.body.name }
  });
  try {
    const ingredientMeal = await meal.addIngredient(ingredient);

    res.json(ingredientMeal);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = Router;
