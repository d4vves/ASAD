'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Entries = require('../lib/entries.json').entries
    let entriesArr = Entries.map(entry => {
      return {
        id: entry['catalogue_num'],
        catalogue_num: entry['catalogue_num'],
        send_date: entry['send_date'],
        artist: entry['artist'],
        song: entry['song'],
        release_date: entry['release_date'],
        spotify_link: entry['spotify_link'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    return queryInterface.bulkInsert('entries', entriesArr)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('entries', null)
  }
};
