// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Router = require("express").Router();
const request = require("request");

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
// get meals from meal id
// Router.route("/api/mealGet").get((req, res) => {
//   console.log("myid", req.params.mealId);
//   db.Meal.findAll({
//     include: [{ model: db.Ingredient, attributes: ["name"] }]
//   }).then(ingredient => res.json(ingredient));
// });

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

//adding recipe:
Router.get("/api/all_recipes", (req, res) => {
  db.recipes.findAll().then(dbRecipe => {
    res.json(dbRecipe);
  });
});

// Get one recipe
Router.get("/api/recipes/:id", (req, res) => {
  db.recipes.findOne({ where: { id: req.params.id } }).then(dbRecipe => {
    res.json(dbRecipe);
  });
});

// Create a new recipe
Router.post("/api/recipes", (req, res) => {
  db.recipes.create(req.body).then(dbRecipe => {
    res.json(dbRecipe);
  });
});

// Create a recipe ingredients
Router.post("/api/recipe_ingredients", (req, res) => {
  const temp = [];
  const array = JSON.parse(req.body.ingredients);

  array.forEach(element => {
    temp.push(element);
  });

  //------------------------------------------------------------------------------------------------------------------------------
  db.recipeIngredientMeas.bulkCreate(temp).then(dbRecipeIngredient => {
    res.json(dbRecipeIngredient);
  });
});

Router.post("/api/nutrition_facts", (req, res) => {
  const options = {
    method: "POST",
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    headers: {
      "x-Router-key": "9c7352952e4f2e99216dc39377db47d8",
      "x-Router-id": "95128c41",
      "Content-Type": "Routerlication/json"
    },
    body: {
      query: req.body.query,
      line_delimited: false,
      timezone: "US/Eastern",
      use_raw_foods: false,
      use_branded_foods: false,
      locale: "en_US"
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) {
      throw new Error(error);
    }

    res.json(body.foods[0]);
  });
});

// PUT route update a recipe
Router.put("/api/recipes", (req, res) => {
  db.recipes
    .update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(dbRecipe => {
      res.json(dbRecipe);
    });
});

// Delete a recipe by id
Router.delete("/api/recipes/:id", (req, res) => {
  db.recipes.destroy({ where: { id: req.params.id } }).then(dbRecipe => {
    res.json(dbRecipe);
  });
});

// Create a new Ingredient
Router.post("/api/ingredient", (req, res) => {
  db.ingredients
    .findAll({
      where: {
        ingredientName: req.body.ingredientName
      }
    })
    .then(insertIngre => {
      if (insertIngre.length > 0) {
        //Do nothing ingredient exists
        res.json(insertIngre[0]);
      } else {
        //Add Ingredient
        db.ingredients.create(req.body).then(dbIngredient => {
          res.json(dbIngredient);
        });
      }
    });
});

// Get ingredients
Router.post("/api/ingredientsList", (req, res) => {
  const options = {
    method: "GET",
    url: "https://trackapi.nutritionix.com/v2/search/instant",
    qs: { query: req.body.term, branded: "false", locale: "en_US" },
    headers: {
      "x-app-key": "9c7352952e4f2e99216dc39377db47d8",
      "x-app-id": "95128c41"
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      throw new Error(error);
    }

    const matchIngredients = [];

    JSON.parse(body).common.forEach(element => {
      const ingredient = {
        food_name: element.food_name,
        photo:
          element.photo.thumb !== null
            ? element.photo.thumb
            : "http://placehold.it/50x50"
      };
      matchIngredients.push(ingredient);
    });

    res.jsonp(matchIngredients);
  });
});

// Get meals. avaliables
Router.post("/api/measures", (req, res) => {
  const options = {
    method: "POST",
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    headers: {
      "x-app-key": "9c7352952e4f2e99216dc39377db47d8",
      "x-app-id": "95128c41",
      "Content-Type": "application/json"
    },
    body: {
      query: req.body.food_name,
      line_delimited: false,
      timezone: "US/Eastern",
      use_raw_foods: false,
      use_branded_foods: false,
      locale: "en_US"
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) {
      throw new Error(error);
    }

    const avaliableMeas = [];
    const meas = [];

    body.foods[0].alt_measures.forEach(element => {
      //avoid duplicates checking if the value exists
      if (meas.indexOf(element.measure) < 0) {
        avaliableMeas.push({
          measureName: element.measure
        });
        meas.push(element.measure);
      }
    });

    db.measure
      .findAll({
        where: {
          measure_name: {
            $in: meas
          }
        }
      })
      .then(insertMeas => {
        if (insertMeas.length < avaliableMeas.length) {
          const temp = [];

          meas.forEach(element => {
            temp.push(element);
          });

          for (let index = 0; index < insertMeas.length; index++) {
            const name = insertMeas[index].dataValues.measureName;
            const existing = temp.indexOf(name);
            temp.splice(existing, 1);
            avaliableMeas.splice(existing, 1);
          }

          db.measure.bulkCreate(avaliableMeas).then(measIn => {
            db.measure
              .findAll({
                where: {
                  measure_name: {
                    $in: meas
                  }
                }
              })
              .then(result => {
                const finalArray = [];

                result.forEach(element => {
                  finalArray.push({
                    measureId: element.dataValues.measureId,
                    measureName: element.dataValues.measureName
                  });
                });
                res.jsonp(finalArray);
              });
          });
        } else {
          const finalArray = [];

          insertMeas.forEach(element => {
            finalArray.push({
              measureId: element.dataValues.measureId,
              measureName: element.dataValues.measureName
            });
          });
          res.jsonp(finalArray);
        }
      });
  });
});

module.exports = Router;
