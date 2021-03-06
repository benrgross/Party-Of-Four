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

    models.Ingredient.belongsToMany(models.User, {
      through: {
        model: "WatchList",
        as: "WatchList",
        unique: false
      },
      constraints: false,
      foreignKey: "IngredientId"
    });
  };

  return Ingredient;
};
