const moment = require("moment");
module.exports = (sequelize, DataType) => {
  const Meal = sequelize.define("Meal", {
    createdAt: {
      type: DataType.DATE,

      get() {
        return moment(this.getDataValue("createdAt")).format(
          "DD/MM/YYYY h:mma"
        );
      }
    }
  });

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
