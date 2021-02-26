module.exports = (sequelize, DataTypes) => {
  const MealIngredients = sequelize.define("MealIngredients", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return MealIngredients;
};
