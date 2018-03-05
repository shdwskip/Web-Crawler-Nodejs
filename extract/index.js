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

const {
    getAllMonitorsDesktopBg,
} = require('./desktopbg-details-extract');

module.exports = {
    getAllProductsUrls,
    getTotalPages,
    getAllProductsDetails,
    getProductsWithNoPromos,
    getAllMonitorsDesktopBg,
};
