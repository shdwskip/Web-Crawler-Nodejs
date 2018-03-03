const domParser = require('../dom-parser');
const {
    TECHNOPOLIS,
} = require('../selectors');

const getProductsFromCurrentPage = async (urlLink) => {
    const $ = await domParser.initDomParser(urlLink);
    const $productLink = $(TECHNOPOLIS.monitorsUrls);
    return [...$productLink].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const getAllProductsUrls = async (link, page) => {
    const currentProducts = await getProductsFromCurrentPage(link);
    if (currentProducts.length === 0) {
        return [];
    }
    const restOfLink = link.slice(link.indexOf('page=') + 6);
    link = link.substring(0, link.indexOf('page=') + 5) +
            (page + 1) + restOfLink;
    const nextProducts = await getAllProductsUrls(link, page + 1);

    return [...currentProducts, ...nextProducts];
};

module.exports = {
    getAllProductsUrls,
};
