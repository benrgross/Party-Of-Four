module.exports = sequelize => {
  const Meal = sequelize.define("Meal", {});
  Meal.associate = models => {
    models.Meal.belongsTo(models.User);

    models.Meal.belongsToMany(models.Ingredient, {
      through: {
        model: "MealIngredients",
        // as: "userIngredients",
        unique: false
      },
      constraints: false,
      foreignKey: "MealId"
    });
  };
  return Meal;
};
