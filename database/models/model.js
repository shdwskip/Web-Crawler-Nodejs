'use strict';
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('model', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {});
  model.associate = (models) => {
    const {
      store,
      spec,
      vendor,
    } = models;

    model.belongsToMany(store, {
      through: 'model_store',
    });

    model.belongsToMany(spec, {
      through: 'model_specs',
    });

    model.belongsTo(vendor, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return model;
};
