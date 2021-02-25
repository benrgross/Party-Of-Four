module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define("Meal", {
    date: {
      type: DataTypes.DATE
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  });
  Meal.associate = models => {
    Meal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Meal.associate = models => {
    Meal.belongsToMany(models.Ingredients, {
      through: "MealIngredient",
      foreignKey: "MealId"
    });
  };
  return Meal;
};
