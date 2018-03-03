const {
    getAllProductsUrls,
} = require('./products-urls-extract');

const {
    getTotalPages,
} = require('./total-pages-technopolis-extract');

const {
    getAllProductsDetails,
} = require('./products-details-extract');

module.exports = {
    getAllProductsUrls,
    getTotalPages,
    getAllProductsDetails,
};
