'use strict';

const crypto = require("crypto");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('password');
      },
      set(value) {
        this.setDataValue('password', crypto
          .createHash('md5')
          .update(value)
          .digest('hex')
        );
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });

  Users.prototype.correctPassword = async function (enteredPassword) {
    const isEqual = await crypto
      .createHash('md5')
      .update(enteredPassword)
      .digest('hex') === this.password;
    return isEqual;
  }

  return Users;
};