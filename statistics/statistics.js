/* globals process */
const chalk = require('chalk');

const {
    orderBy,
    filterBy,
    searchFor,
} = require('./db-queries');

const {
    visualize,
} = require('./visualize-data/visualize');

const run = async () => {
    const command = process.argv[2];
    const column = process.argv[3];
    const param = process.argv[4];
    const value = process.argv[5];

    if (command === 'order-by') {
        const result = await orderBy(column);
        if (result) {
            visualize(result);
        }
    } else if (command === 'filter') {
        const result = await filterBy(column, param, value);
        if (result) {
            visualize(result);
        }
    } else if (command === 'search') {
        const result = await searchFor(column);
        if (result) {
            visualize(result);
        }
    } else {
        console.log(chalk.red.bold(`Command '${command}' not recognized!`));
        return;
    }
};

run();
