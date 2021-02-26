module.exports = sequelize => {
  const Meal = sequelize.define("Meal", {
    // date: {
    //   type: DataTypes.INTEGER
    // },
    // time: {
    //   type: DataTypes.INTEGER
    // }
  });
  Meal.associate = models => {
    models.Meal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Meal.associate = models => {
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
