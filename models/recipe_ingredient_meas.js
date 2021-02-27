module.exports = function (sequelize, DataTypes) {
	return sequelize.define('recipeIngredientMeas', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		quantity: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'quantity'
		},
		ingredientsIngredientId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'ingredients',
				foreignKey: 'ingredient_id'
			},
			field: 'ingredients_ingredient_id'
		},
		measureMeasureId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'measure',
				foreignKey: 'measure_id'
			},
			field: 'measure_measure_id'
		},
		recipesRecipeId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'recipes',
				foreignKey: 'recipe_id'
			},
			field: 'recipes_recipe_id'
		}
	}, {
		tableName: 'recipe_ingredient_meas'
	});
};
