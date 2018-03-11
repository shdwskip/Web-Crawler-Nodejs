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
} = require('./order-by');

const command = process.argv[2];
const column = process.argv[3];
const param = process.argv[4];
const value2 = process.argv[5];
console.log(command);
console.log(column);
console.log(param);
console.log(value2);

const run = async () => {
    if (command === 'order-by') {
        await orderBy(column);
        connection.sequelize.close();
    }
};

run();
