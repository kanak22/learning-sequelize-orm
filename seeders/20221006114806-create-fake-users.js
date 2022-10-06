'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      {
        uuid: 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
        name: 'John Doe',
        email: 'john@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: 'f1f1f1f1-f1f1-f3f1-f1f1-f1f1f1f1f1f1',
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

  }
};
