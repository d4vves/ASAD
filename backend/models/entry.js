'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  entry.init({
    catalogue_num: DataTypes.INTEGER,
    send_date: DataTypes.STRING,
    artist: DataTypes.STRING,
    song: DataTypes.STRING,
    release_date: DataTypes.INTEGER,
    spotify_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'entry',
  });
  return entry;
};