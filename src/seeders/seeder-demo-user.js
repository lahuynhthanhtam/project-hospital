'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Nguyen',
      password: '123456',
      lastName: 'Lam Vy',
      email: 'nguyenlamvy@gmail.com',
      address: 'Quảng Ngãi',
      gender: 0,
      rodeId: 1,
      phoneNumber: '0123456789',
      positionID: null,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
