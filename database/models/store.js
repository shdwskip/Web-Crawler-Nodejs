'use strict';
module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  store.associate = (models) => {
    // associations can be defined here
  };
  return store;
};
