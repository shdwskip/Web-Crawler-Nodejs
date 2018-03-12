const Sequelize = require('sequelize');
const chalk = require('chalk');

const {
    model,
    spec,
    vendor,
    store,
} = require('../../database/models');

const orderBy = async (column) => {
    let orderedRecords;
    if (column === 'model' || column === 'vendor' || column === 'stores' ||
        column === 'price') {
        if (column !== 'price') {
            column = column + '.name';
        }
        orderedRecords = await model.findAll({
            include: [{
                    model: vendor,
                    attributes: ['name'],
                },
                {
                    model: store,
                    attributes: ['name'],
                },
                {
                    model: spec,
                    attributes: ['type', 'value'],
                },
            ],
            attributes: [
                Sequelize.col('vendor.name'),
                ['name', 'model'], 'price', 'picture',
                Sequelize.col('specs.type'),
                Sequelize.col('specs.value'),
                Sequelize.col('stores.name'),
            ],
            order: Sequelize.col(column),
        });
    } else if (column === 'resolution' || column === 'warranty' ||
        column === 'display' || column === 'size' || column === 'hdmi' ||
        column === 'display_port' || column === 'color') {
        orderedRecords = await model.findAll({
            include: [{
                    model: spec,
                    attributes: ['type', 'value'],
                    order: Sequelize.col('value'),
                    where: {
                        type: column,
                    },
                },
                {
                    model: vendor,
                    attributes: ['name'],
                },
                {
                    model: store,
                    attributes: ['name'],
                },
            ],
            attributes: [
                Sequelize.col('vendor.name'),
                ['name', 'model'], 'price', 'picture',
                Sequelize.col('specs.type'),
                Sequelize.col('specs.value'),
                Sequelize.col('stores.name'),
            ],
        });
    } else {
        console.log(chalk.red.bold('Column not found!'));
    }
    if (typeof orderedRecords !== 'undefined') {
        orderedRecords = orderedRecords.map((record) => (record.get({
            plain: true,
        })));
    }
    return orderedRecords;
};

module.exports = {
    orderBy,
};
