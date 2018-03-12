const Sequelize = require('sequelize');
const chalk = require('chalk');

const {
    model,
    spec,
    vendor,
    store,
} = require('../../database/models');

const filterBy = async (column, param, val) => {
    let Op = Sequelize.Op;
    let filteredRecords;
    if (column === 'color' || column === 'display') {
        filteredRecords = await model.findAll({
            include: [{
                    model: spec,
                    attributes: ['type', 'value'],
                    order: Sequelize.col('value'),
                    where: {
                        type: column,
                        value: {
                            $eq: param,
                        },
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
        if (filteredRecords.length === 0) {
            console.log(chalk.red.bold('Nothing found, check your command!'));
        }
    } else if (column === 'size' || column === 'warranty') {
        if (param === 'gt') {
            Op = Op.gt;
        } else if (param === 'lt') {
            Op = Op.lt;
        }

        filteredRecords = await model.findAll({
            include: [{
                    model: spec,
                    attributes: ['type', 'value'],
                    order: Sequelize.col('value'),
                    where: {
                        type: column,
                        value: {
                            [Op]: +val,
                        },
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
        if (filteredRecords.length === 0) {
            console.log(chalk.red.bold('Nothing found, check your command!'));
        }
    } else {
        console.log(chalk.red.bold('Column not found!'));
    }
    if (typeof filteredRecords !== 'undefined') {
        filteredRecords = filteredRecords.map((record) => record.get({
            plain: true,
        }));
    }
    return filteredRecords;
};

module.exports = {
    filterBy,
};
