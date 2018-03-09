'use strict';
module.exports = (sequelize, DataTypes) => {
  const spec = sequelize.define('spec', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      /* eslint-disable */
      type: DataTypes.STRING(255),
      /* eslint-enable */
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
