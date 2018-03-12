const {
    getAllProductsUrls,
} = require('./technopolisbg/products-urls-extract');

const {
    getAllProductsDetails,
} = require('./technopolisbg/products-details-extract');

const {
    getProductsWithNoPromos,
} = require('./desktopbg/desktopbg-urls-extract');

const {
    getAllMonitorsDesktopBg,
} = require('./desktopbg/desktopbg-details-extract');

module.exports = {
    getAllProductsUrls,
    getAllProductsDetails,
    getProductsWithNoPromos,
    getAllMonitorsDesktopBg,
};
