/* globals process */
const chalk = require('chalk');

const {
    orderBy,
    filterBy,
    searchFor,
} = require('./db-queries');

const {
    visualizeTable,
} = require('./visualize-data/visualize');

const run = async () => {
    const command = process.argv[2];
    const column = process.argv[3];
    const param = process.argv[4];
    const value = process.argv[5];
    let result;

    if (command === 'order-by') {
        result = await orderBy(column);
        if (result) {
            visualizeTable(result);
        }
    } else if (command === 'filter') {
        result = await filterBy(column, param, value);
        if (result) {
            visualizeTable(result);
        }
    } else if (command === 'search') {
        result = await searchFor(column);
        if (result) {
            visualizeTable(result);
        }
    } else {
        console.log(chalk.red.bold(`Command '${command}' not recognized!`));
        return;
    }
};

run();
