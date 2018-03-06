const {
    getAllProductsUrls,
} = require('./technopolisbg/products-urls-extract');

const {
    getTotalPages,
} = require('./technopolisbg/total-pages-technopolis-extract');

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
    getTotalPages,
    getAllProductsDetails,
    getProductsWithNoPromos,
    getAllMonitorsDesktopBg,
};
