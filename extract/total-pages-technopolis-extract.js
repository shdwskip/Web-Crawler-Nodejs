const domParser = require('../dom-parser');
const {
    TECHNOPOLIS,
} = require('../selectors');

const getAllProducts = async () => {
    const $ = await domParser.initDomParser(TECHNOPOLIS.url);
    const $allProductsSelector = $(TECHNOPOLIS.totalMonitors);
    const totalProducts = +$allProductsSelector.html().trim();
    return totalProducts;
};

const calculateAllPages = (total, displayed) => Math.ceil(total / displayed);

const getTotalPages = async () => {
    const totalProducts = await getAllProducts();
    const productsByPage = 48;
    const allPages = calculateAllPages(totalProducts, productsByPage);
    return allPages;
};

// const test = async () => {
//     const bahmaikamu = await getTotalPages();
//     console.log(bahmaikamu);
// };

// test();

module.exports = {
    getTotalPages,
};
