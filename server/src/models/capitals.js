'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Capitals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   Capitals.belongsTo(models.Recipes, {foreignKey: "recipeId", as: "recipes"})
    // }
  }
  Capitals.init({
    value: DataTypes.STRING,
    data: DataTypes.DATE,
    recipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Capitals',
  });
  return Capitals;
};