'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spends.belongsTo(models.Expenses, {foreignKey: "expenseId", as: "expenses"})
    }
  }
  Spends.init({
    value: DataTypes.STRING,
    date: DataTypes.DATE,
    expenseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spends',
  });
  return Spends;
};