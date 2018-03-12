const Sequelize = require('sequelize');
const chalk = require('chalk');

const {
    model,
    spec,
    vendor,
    store,
} = require('../../database/models');

const searchFor = async (searchVal) => {
    let foundRecords = await model.findAll({
        include: [{
                model: spec,
                where: {
                    $or: [{
                            $and: [{
                                    type: {
                                        like: '%' + searchVal + '%',
                                    },
                                },
                                {
                                    value: {
                                        $eq: 'YES',
                                    },
                                },
                            ],
                        },
                        {
                            value: {
                                like: '%' + searchVal + '%',
                            },
                        },
                    ],
                },
                attributes: ['type', 'value'],
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
    if (foundRecords.length !== 0) {
        foundRecords = foundRecords.map((record) => record.get({
            plain: true,
        }));
    } else {
        console.log(chalk.red.bold('Searched value not found!'));
    }
    return foundRecords;
};

module.exports = {
    searchFor,
};
