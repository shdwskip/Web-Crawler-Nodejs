/* globals process */

const {
    orderBy,
    filterBy,
    searchFor,
} = require('./db-queries');

const command = process.argv[2];
const column = process.argv[3];
const param = process.argv[4];
const value = process.argv[5];

const run = async () => {
    if (command === 'order-by') {
        await orderBy(column);
    } else if (command === 'filter') {
        await filterBy(column, param, value);
    } else if (command === 'search') {
        await searchFor(column);
        console.log('Searching done!');
    } else {
        console.log('Command not recognized!');
        return;
    }
};

run();
