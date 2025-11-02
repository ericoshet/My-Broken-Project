'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Nadya',
          email: 'naDya89@mail.ru',
          password: await bcrypt.hash('naDya89@mail.ru', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ernest',
          email: 'ernEst47@mail.ru',
          password: await bcrypt.hash('ernEst47@mail.ru', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Andrey',
          email: 'AnDrey547@mail.ru',
          password: await bcrypt.hash('AnDrey547@mail.ru', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Alan',
          email: 'AlahaM747@mail.ru',
          password: await bcrypt.hash('AlahaM747@mail.ru', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
