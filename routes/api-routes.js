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
Router.get("/api/all_recipes", function (req, res) {
  db.recipes.findAll().then(function (dbRecipe) {
    res.json(dbRecipe);
  });
});

// Get one recipe
Router.get("/api/recipes/:id", function (req, res) {
  db.recipes.findOne({ where: { id: req.params.id } }).then(function (dbRecipe) {
    res.json(dbRecipe);
  });
});

// Create a new recipe
Router.post("/api/recipes", function (req, res) {
  db.recipes.create(req.body)
    .then(function (dbRecipe) {
      res.json(dbRecipe);
    });
});

// Create a recipe ingredients
Router.post("/api/recipe_ingredients", function (req, res) {
  var temp = [];
  var array = JSON.parse(req.body.ingredients);

  array.forEach(element => {
    temp.push(element);
  });

  //------------------------------------------------------------------------------------------------------------------------------
  db.recipeIngredientMeas.bulkCreate(temp)
    .then(function (dbRecipeIngredient) {
      res.json(dbRecipeIngredient);
    });
});

Router.post("/api/nutrition_facts", function (req, res) {
  var options = {
    method: 'POST',
    url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    headers:
    {
      'x-Router-key': '9c7352952e4f2e99216dc39377db47d8',
      'x-Router-id': '95128c41',
      'Content-Type': 'Routerlication/json'
    },
    body:
    {
      query: req.body.query,
      line_delimited: false,
      timezone: 'US/Eastern',
      use_raw_foods: false,
      use_branded_foods: false,
      locale: 'en_US'
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.json(body.foods[0]);
  })
});


// PUT route update a recipe
Router.put("/api/recipes", function (req, res) {
  db.recipes.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function (dbRecipe) {
      res.json(dbRecipe);
    });
});

// Delete a recipe by id
Router.delete("/api/recipes/:id", function (req, res) {
  db.recipes.destroy({ where: { id: req.params.id } }).then(function (dbRecipe) {
    res.json(dbRecipe);
  });
});


// Create a new Ingredient
Router.post("/api/ingredient", function (req, res) {

  db.ingredients.findAll({
    where: {
      ingredientName: req.body.ingredientName
    }
  }).then(function (insertIngre) {
    if (insertIngre.length > 0) {
      //Do nothing ingredient exists
      res.json(insertIngre[0]);
    } else {
      //Add Ingredient
      db.ingredients.create(req.body).then(function (dbIngredient) {
        res.json(dbIngredient);
      });
    }
  })
});


// Get ingredients
Router.post("/api/ingredientsList", function (req, res) {

  var options = {
    method: 'GET',
    url: 'https://trackapi.nutritionix.com/v2/search/instant',
    qs: { query: req.body.term, branded: 'false', locale: 'en_US' },
    headers:
    {
      'x-Router-key': '9c7352952e4f2e99216dc39377db47d8',
      'x-Router-id': '95128c41'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var matchIngredients = [];

    JSON.parse(body).common.forEach(element => {
      var ingredient = {
        food_name: element.food_name,
        photo: element.photo.thumb !== null ? element.photo.thumb : "http://placehold.it/50x50"
      }
      matchIngredients.push(ingredient);
    });

    res.jsonp(matchIngredients);
  });
});

// Get meas. avaliables
Router.post("/api/measures", function (req, res) {

  var options = {
    method: 'POST',
    url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    headers:
    {
      'x-Router-key': '9c7352952e4f2e99216dc39377db47d8',
      'x-Router-id': '95128c41',
      'Content-Type': 'Routerlication/json'
    },
    body:
    {
      query: req.body.food_name,
      line_delimited: false,
      timezone: 'US/Eastern',
      use_raw_foods: false,
      use_branded_foods: false,
      locale: 'en_US'
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var avaliableMeas = [];
    var meas = [];

    body.foods[0].alt_measures.forEach(element => {
      //avoid duplicates checking if the value exists
      if (meas.indexOf(element.measure) < 0) {
        avaliableMeas.push({
          measureName: element.measure
        });
        meas.push(element.measure);
      }
    });

    db.measure.findAll({
      where: {
        measure_name: {
          $in: meas
        }
      }
    }).then(function (insertMeas) {
      if (insertMeas.length < avaliableMeas.length) {
        var temp = [];

        meas.forEach(element => {
          temp.push(element);
        });

        for (let index = 0; index < insertMeas.length; index++) {
          var name = insertMeas[index].dataValues.measureName;
          var existing = temp.indexOf(name);
          temp.splice(existing, 1)
          avaliableMeas.splice(existing, 1)
        }

        db.measure.bulkCreate(avaliableMeas)
          .then(function (measIn) {
            db.measure.findAll({
              where: {
                measure_name: {
                  $in: meas
                }
              }
            }).then(function (result) {
              var finalArray = [];

              result.forEach(element => {
                finalArray.push({
                  measureId: element.dataValues.measureId,
                  measureName: element.dataValues.measureName
                });
              });
              res.jsonp(finalArray);
            })
          });
      } else {
        var finalArray = [];

        insertMeas.forEach(element => {
          finalArray.push({
            measureId: element.dataValues.measureId,
            measureName: element.dataValues.measureName
          });
        });
        res.jsonp(finalArray);
      }
    })
  });
});






module.exports = Router;
