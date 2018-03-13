const cTable = require('console.table');
const chalk = require('chalk');
const Table = require('easy-table');


const colorFulVisualize = (arr) => {
    arr.forEach((obj, index) => {
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
        console.log(chalk.white.bold(`#${index}`));
        console.log(chalk.blue(store));
        console.log(chalk.yellow('Vendor:', obj.vendor.name));
        console.log(chalk.yellow('Model:', obj.model));
        console.log(chalk.yellow('Price:', obj.price));
        console.log(chalk.yellow('Picture:', obj.picture, '\n'));
        console.log(chalk.green(specs));
        console.log(chalk.red('='.repeat(40)));
    });
};


const visualizeTable = (arr) => {
    const t = new Table;

    arr.forEach((obj, index) => {
        const specs = obj.specs.map((x) => {
            return {
                specification: x.type,
                value: x.value,
            };
        });
        const stores = obj.stores.map((x) => {
            return {
                name: x.name,
            };
        });
        t.cell('#', index);
        t.cell('Vendor', obj.vendor.name);
        t.cell('Model', obj.model);
        t.cell('Price', obj.price);
        specs.forEach((spec) => {
            t.cell('Specification', spec.specification);
            t.cell('Value', spec.value);
        });
        stores.forEach((store) => {
            t.cell('Store', store.name);
        });
        t.cell('Picture', obj.picture);
        t.newRow();
    });
    console.log(chalk.green(t.toString()));
};

module.exports = {
    colorFulVisualize,
    visualizeTable,
};
