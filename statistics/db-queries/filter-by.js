const {
    model,
    spec,
    vendor,
    store,
} = require('../../database/models');

const Sequelize = require('sequelize');

let Op = Sequelize.Op;

const filterBy = async (column, param, val) => {
    let filteredRecords;
    if (column === 'color' || column === 'display') {
        filteredRecords = await model.findAll({
            include: [{
                    model: spec,
                    order: Sequelize.col('value'),
                    where: {
                        type: column,
                        value: {
                            [Op.eq]: param,
                        },
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
    } else if (column === 'size' || column === 'warranty') {
        if (param === 'gt') {
            Op = Op.gt;
        } else if (param === 'lt') {
            Op = Op.lt;
        }

        filteredRecords = await model.findAll({
            include: [{
                    model: spec,
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

    filteredRecords.map((record) => console.log(record.get({
        plain: true,
    })));
};

module.exports = {
    filterBy,
};
