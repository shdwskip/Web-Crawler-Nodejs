'use strict';
module.exports = (sequelize, DataTypes) => {
  const spec = sequelize.define('spec', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ['type', 'value'],
    }],
  });
  spec.associate = (models) => {
    // associations can be defined here
  };
  return spec;
};
