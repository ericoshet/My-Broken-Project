'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate({ User }) {
    this.belongsTo(User, { foreignKey: 'userId'});
    }

static validate(bookData) {
      const { title, desc, pages, hasBeenRead,   author, picture } = bookData;
      if (!title || typeof title !== 'string' || title.trim() === '')
        return { isValid: false, error: 'Title is required' };
      if (!desc || typeof desc !== 'string' || desc.trim() === '')
        return { isValid: false, error: 'Description is required' };
      // if (!desc || typeof pages !== 'string' || pages.trim() === '')
      //   return { isValid: false, error: 'Pages is required' };
      // if (!desc || typeof hasBeenRead !== 'boolean' )
      //   return { isValid: false, error: 'HasBeenRead is required' };
      // if (!desc || typeof userId !== 'number' || userId.trim() === '')
      //   return { isValid: false, error: 'UserId is required' };
      // if (!desc || typeof author !== 'string' || author.trim() === '')
      //   return { isValid: false, error: 'Author is required' };
      // if (!desc || typeof picture !== 'string' || picture.trim() === '')
      //   return { isValid: false, error: 'Picture is required' };
      // return { isValid: true, error: null };
    }

  }
  Book.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    author: DataTypes.STRING,
    picture: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    hasBeenRead: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
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
    modelName: 'Book',
  });
  return Book;
};