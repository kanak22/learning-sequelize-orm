'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Post}) {
      this.hasMany(Post, {foreignKey:'userId', as:'posts'});
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false,
      validate: {notNull: {msg: 'A user must have a name'}, notEmpty: {msg: 'A user must have a name'}} },
    email: { type: DataTypes.STRING, allowNull: false, validate: {notNull: {msg: 'A user must have a email'}, notEmpty: {msg: 'A user must have a email'}, isEmail:{msg: 'A user must have a valid email'}} },
    role: { type: DataTypes.STRING, allowNull: false,validate: {notNull: {msg: 'A user must have a role'}, notEmpty: {msg: 'A user must have a role'}} }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};