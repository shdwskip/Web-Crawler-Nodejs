/* globals process */
const {
    model,
    spec,
} = require('../database/models');

const Sequelize = require('sequelize');
const connection = require('../database/models');
// const Op = Sequelize.Op;

const {
    orderBy,
    filterBy,
    saveMonitorsInDb,
} = require('./db-queries');

const command = process.argv[2];
const column = process.argv[3];
const param = process.argv[4];
const value = process.argv[5];
// console.log(command);
// console.log(column);
// console.log(param);
// console.log(value);

const run = async () => {
    if (command === 'order-by') {
        await orderBy(column);
        connection.sequelize.close();
    } else if (command === 'filter') {
        await filterBy(column, param, value);
        connection.sequelize.close();
    }
};

run();
