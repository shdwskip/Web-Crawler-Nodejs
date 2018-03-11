const {
    model,
    spec,
    vendor,
    store,
} = require('../database/models');

const Sequelize = require('sequelize');

const orderBy = async (column) => {
    let orderedRecords;
    if (column === 'model' || column === 'vendor' || column === 'stores' ||
        column === 'price') {
        if (column !== 'price') {
            column = column + '.name';
        }

        orderedRecords = await model.findAll({
            order: Sequelize.col(column),
            include: [{
                    model: vendor,
                    order: Sequelize.col(column),
                },
                {
                    model: store,
                    order: Sequelize.col(column),
                },
                {
                    model: spec,
                },
            ],
        });
    } else if (column === 'resolution' || column === 'warranty' ||
        column === 'display' || column === 'size' || column === 'hdmi' ||
        column === 'display_port' || column === 'color') {
        orderedRecords = await model.findAll({
            include: [{
                    model: spec,
                    order: Sequelize.col('value'),
                    where: {
                        type: column,
                    },
                },
                {
                    model: vendor,
                },
                {
                    model: store,
                },
            ],
        });
    } else {
        console.log('Column not found!');
        return;
    }
    orderedRecords.map((record) => console.log(record.get({
        plain: true,
    })));
};

module.exports = {
    orderBy,
};
