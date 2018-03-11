const {
    model,
    spec,
    vendor,
    store,
} = require('../../database/models');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const searchFor = async (searchVal) => {
    try {
        const foundRecords = await model.findAll({
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
                                            [Op.eq]: 'YES',
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
                },
                {
                    model: vendor,
                },
                {
                    model: store,
                },
            ],
        });
        foundRecords.map((record) => console.log(record.get({
            plain: true,
        })));
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    searchFor,
};
