module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inflammatory: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Ingredient.associate = models => {
    models.Ingredient.belongsToMany(models.Meal, {
      through: "MealIngredient",
      foreignKey: "IngredientId"
    });
  };
  return Ingredient;
};
