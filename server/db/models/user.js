'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Book }) {
     this.hasMany(Book, { foreignKey: 'userId' });
    };
  

static validateSignup(user) {
      const { name, email, password } = user;
      if (!name || typeof name !== 'string' || name.trim() === '')
        return { isValid: false, error: 'Name is required' };
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: 'Email is required' };
      if (
        !password ||
        typeof password !== 'string' ||
        password.trim() === '' ||
        password.length < 6
      )
        return { isValid: false, error: 'Password is required' };
      return { isValid: true, error: null };
    }

    static validateLogin(user) {
      const { email, password } = user;
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: 'Email is required' };
      if (!password || typeof password !== 'string' || password.trim() === '')
        return { isValid: false, error: 'Password is required' };
      return { isValid: true, error: null };
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return JSON.stringify(new Date(this.getDataValue('createdAt')));
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return JSON.stringify(new Date(this.getDataValue('updatedAt')));
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
}
