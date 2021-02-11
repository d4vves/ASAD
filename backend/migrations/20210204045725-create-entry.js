'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      catalogue_num: {
        type: Sequelize.INTEGER
      },
      send_date: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      song: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.INTEGER
      },
      spotify_link: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('entries');
  }
};