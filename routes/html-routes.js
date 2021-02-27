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

Router.get("/meals", (req, res) => {
  res.render("meals", res);
});

// Load add recipe page
Router.get("/recipe", function (req, res) {
  res.render("recipe");
});

// Load recipe page and pass in a recipe by id
Router.get("/recipe/:id", function (req, res) {
  var result = {
    recipeName: null,
    recipeDescription: null,
    ingredients: []
  }

  var ingredients = [];
  var measures = [];
  try {
    db.recipes.findOne({ where: { recipeId: req.params.id } }).then(function (dbRecipe) {
      //Getting recipe name and description
      result.recipeName = dbRecipe.recipeName;
      result.recipeDescription = dbRecipe.recipeDescription;

      db.recipeIngredientMeas.findAll({ where: { recipesRecipeId: dbRecipe.recipeId } }).then(function (dbRecipeIngredientMeas) {
        //Creating ingredients objects
        dbRecipeIngredientMeas.forEach(element => {
          result.ingredients.push({
            quantity: element.dataValues.quantity,
            ingredient: {
              ingredient_id: element.dataValues.ingredientsIngredientId,
              ingredient_name: "",
              ingredient_img: ""
            },
            measure: {
              measure_id: element.dataValues.measureMeasureId,
              measure_name: ""
            }
          });
          ingredients.push(element.dataValues.ingredientsIngredientId);
          measures.push(element.dataValues.measureMeasureId);
        });

        db.measure.findAll({ where: { measure_id: { $in: measures } } }).then(function (matchMeas) {
          //Getting the meas name
          result.ingredients.forEach(element => {
            matchMeas.forEach(local => {
              if (element.measure.measure_id === local.measureId) {
                element.measure.measure_name = local.measureName;
              }
            });
          });

          db.ingredients.findAll({ where: { ingredient_id: { $in: ingredients } } }).then(function (matchIngredients) {
            //Getting the mingredient name and img
            result.ingredients.forEach(element => {
              matchIngredients.forEach(local => {
                if (element.ingredient.ingredient_id === local.ingredientId) {
                  element.ingredient.ingredient_name = local.ingredientName,
                    element.ingredient.ingredient_img = local.ingredientImg
                }
              });
            });

            res.render("detailed_recipe", {
              recipe: result
            });
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
  }

});

module.exports = Router;
