'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expenses.hasMany(models.Spends, {as: "payment"})
    }
  }
  Expenses.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expenses',
  });
  return Expenses;
};