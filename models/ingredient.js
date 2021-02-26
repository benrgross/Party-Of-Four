module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inflammatory: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    }
  });

  Ingredient.associate = models => {
    models.Ingredient.belongsToMany(models.Meal, {
      through: {
        model: "MealIngredients",
        // as: "userIngredients",
        unique: false
      },
      constraints: false,
      foreignKey: "IngredientId"
    });

    Ingredient.associate = models => {
      models.Ingredient.belongsToMany(models.User, {
        through: {
          model: "WatchList",
          as: "userWatchList",
          unique: false
        },
        constraints: false,
        foreignKey: "IngredientId"
      });
    };
  };
  return Ingredient;
};
