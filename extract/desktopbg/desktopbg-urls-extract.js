const domParser = require('../../dom-parser');
const {
    DESKTOPBG,
} = require('../../selectors');

const getProductsFromCurrentPage = async (urlLink) => {
    const $ = await domParser.initDomParser(urlLink);
    const $productLink = $(DESKTOPBG.monitorsUrls);
    return [...$productLink].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const getAllUrls = async (link, page) => {
    const currentProducts = await getProductsFromCurrentPage(link);
    if (currentProducts.length === 0) {
        return [];
    }
    const restOfLink = link.slice(link.indexOf('page=') + 6);
    link = link.substring(0, link.indexOf('page=') + 5) +
            (page + 1) + restOfLink;
    const nextProducts = await getAllUrls(link, page + 1);

    return [...currentProducts, ...nextProducts];
};

const getProductsWithNoPromos = async () => {
    let allUrls = await getAllUrls(DESKTOPBG.url, 1);
    allUrls = allUrls.filter((url) => url.includes('displays'));
    return allUrls;
};

module.exports = {
    getProductsWithNoPromos,
};
