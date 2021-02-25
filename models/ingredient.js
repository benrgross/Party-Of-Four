module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING
    },
    inflammatory: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });

  Ingredient.associate = (models) => {
    models.Ingredient.belongsToMany(models.Meal, {
      through: "MealIngredients",
      foreignKey: "IngredientId"
    });
  };
  return Ingredient;
}