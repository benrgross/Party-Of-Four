// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Router = require("express").Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
Router.route("/api/login").post(passport.authenticate("local"), (req, res) => {
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for signing up a user.
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
      res.status(401).send(err);
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

// get lastest meal id
Router.route("/api/mealId").get((req, res) => {
  db.Meal.findOne({
    order: [["createdAt", "DESC"]]
  }).then(result => res.json(result));
});

// get query for MealIngredient list
Router.route("/api/meals").get((req, res) => {
  console.log(res);
  db.Meal.findAll({
    include: [{ model: db.Ingredient, attributes: ["id", "name"] }]
  }).then(ingredient => {
    console.log(ingredient);
    return res.json(ingredient);
  });
});

// find last meal
Router.route("/api/lastmeal").get((req, res) => {
  db.Meal.findOne({
    include: [{ model: db.Ingredient, attributes: ["id", "name"] }],
    order: [["createdAt", "DESC"]]
  }).then(ingredient => {
    console.log(ingredient);
    return res.json(ingredient);
  });
});

// get query for MealIngredient list
Router.route("/api/allmeals").get((req, res) => {
  console.log(res);
  db.Meal.findAll({
    include: [{ model: db.Ingredient, attributes: ["id", "name"] }],
    order: [["createdAt", "DESC"]]
  }).then(ingredient => {
    return res.json(ingredient);
  });
});

// get query for MealIngredient list
Router.route("/api/allmeals/:offset").get((req, res) => {
  console.log(res);
  db.Meal.findAll({
    include: [{ model: db.Ingredient, attributes: ["id", "name"] }],
    order: [["createdAt", "DESC"]],
    limit: 3,
    offset: Number(req.params.offset)
  }).then(ingredient => {
    return res.json(ingredient);
  });
});

// user id from params.
Router.route("/api/meals/:userId").get((req, res) => {
  console.log(req.params);
  db.Meal.findOne({
    where: {
      id: req.params.userId
    }
  }).then(mealId => res.json(mealId));
});

// get query for MealIngredient list
Router.route("/api/usermeal").get((req, res) => {
  db.User.findAll({
    include: [{ model: db.Meal, attributes: ["createdAt", "id"] }]
  }).then(ingredient => {
    res.json(ingredient);
  });
});

//find all users and associated watchlsit items
Router.route("/api/usermeal").get((req, res) => {
  db.User.findAll({
    include: [{ model: db.Ingredient, attributes: ["createdAt", "id", "name"] }]
  }).then(ingredient => {
    res.json(ingredient);
  });
});

// creates a meal when user submits
Router.post("/api/meals", async (req, res) => {
  const meal = await db.Meal.create({});
  const user = await db.User.findOne({
    where: {
      id: req.body.id
    }
  });
  const userMeal = user.addMeal(meal);

  res.json(userMeal);
});

//associates input ingredient with meal id in meal ingredient table upon submitting ingredient input,
Router.post("/api/ingredients", async (req, res) => {
  console.log(req.body);
  let meal = await db.Meal.findOne({
    where: {
      id: req.body.id
    }
  });

  let ingredient = await db.Ingredient.findOne({
    defaults: { name: req.body.name },
    where: { name: req.body.name }
  });
  if (meal && ingredient) {
    try {
      const ingredientMeal = await meal.addIngredient(ingredient);

      res.json(ingredientMeal);
    } catch (err) {
      throw new Error(err);
    }
  } else {
    try {
      meal = await db.Meal.findOne({
        where: {
          id: req.body.id
        }
      });
      ingredient = await db.Ingredient.create({
        name: req.body.name
      });
      ingredientMeal = await meal.addIngredient(ingredient);
      res.json(ingredientMeal);
    } catch (err) {
      throw new Error();
    }
  }
});

// make route for adding meal to user

//get query for WatchList
Router.route("/api/watchlist").get((req, res) => {
  db.Ingredient.findAll({
    include: [{ model: db.User, attributes: ["id"] }]
  }).then(ingredient => {
    return res.json(ingredient);
  });
});

// route for adding an ingredient to watchlist
Router.post("/api/watchlist", async (req, res) => {
  const user = await db.User.findOne({
    where: {
      id: req.body.userId
    }
  });

  const ingredient = await db.Ingredient.findOne({
    where: { name: req.body.name }
  });
  try {
    const watchList = await ingredient.addUser(user);
    res.json(watchList);
  } catch (err) {
    throw new Error(err);
  }
});

// route for deleting ingredient from watchlist
Router.delete("/api/deletefromwatchlist", async (req, res) => {
  const user = await db.User.findOne({
    where: {
      id: req.body.userId
    }
  });
  const ingredient = await db.Ingredient.findOne({
    where: {
      name: req.body.name
    }
  });
  try {
    const deleteWatch = await ingredient.removeUser(user);
    res.json(deleteWatch);
  } catch (err) {
    throw new Error(err);
  }
});

//delete from meal route
Router.delete("/api/deletefrommeal", async (req, res) => {
  const meal = await db.Meal.findOne({
    where: {
      id: req.body.mealId
    }
  });
  const ingredient = await db.Ingredient.findOne({
    where: {
      name: req.body.name
    }
  });
  try {
    const deleteWatch = await meal.removeIngredient(ingredient);
    res.json(deleteWatch);
  } catch (err) {
    throw new Error(err);
  }
});

// make route for deleting meal?

module.exports = Router;
