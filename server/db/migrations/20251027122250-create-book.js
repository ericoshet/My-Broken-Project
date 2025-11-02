'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hasBeenRead: {
        type: Sequelize.BOOLEAN
      },
      picture: {
        type: Sequelize.STRING,
      },
        userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'SET NULL',
        references: {
        model: 'Users',
        key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};