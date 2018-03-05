const {
    getAllProductsUrls,
} = require('./products-urls-extract');

const {
    getTotalPages,
} = require('./total-pages-technopolis-extract');

const {
    getAllProductsDetails,
} = require('./products-details-extract');

const {
    getProductsWithNoPromos,
} = require('./desktopbg-urls-extract');

module.exports = {
    getAllProductsUrls,
    getTotalPages,
    getAllProductsDetails,
    getProductsWithNoPromos,
};
