/* globals __dirname */

// const path = require('path');

// require('fs')
//     .readdirSync(__dirname)
//     .filter((file) => file.includes('extract'))
//     .forEach((moduleName) => {
//         const modulePath = path.join(__dirname, moduleName);
//         const currentFile = path.basename(moduleName, 'extract');
//         module.exports[currentFile] = require(modulePath);
//     });
const extract = {
    getAllProducts: require('./products-urls-extract'),
    getTotalPages: require('./total-pages-technopolis-extract'),
};

module.exports = extract;
