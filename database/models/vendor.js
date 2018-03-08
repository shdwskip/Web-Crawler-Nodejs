'use strict';
module.exports = (sequelize, DataTypes) => {
  const vendor = sequelize.define('vendor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  vendor.associate = (models) => {
    // associations can be defined here
  };
  return vendor;
};
