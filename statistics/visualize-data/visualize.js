const cTable = require('console.table');
const chalk = require('chalk');


const visualize = (arr) => {
    arr.forEach((obj) => {
        const specs = cTable.getTable(obj.specs.map((x) => {
            return {
                Specification: x.type,
                Value: x.value,
            };
        }));
        const store = cTable.getTable(obj.stores.map((x) => {
            return {
                store: x.name,
            };
        }));
        console.log(store);
        console.log(chalk.blue('Vendor:'), obj.vendor.name);
        console.log(chalk.blue('Model:'), obj.model);
        console.log(chalk.blue('Price:'), obj.price);
        console.log(chalk.blue('Picture:'), obj.picture, '\n');
        console.log(chalk.green(specs));
        console.log(chalk.red('='.repeat(40)));
    });
};

module.exports = {
    visualize,
};
