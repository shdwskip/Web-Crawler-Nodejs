const domParser = require('../dom-parser');
const {
    TECHNOPOLIS,
} = require('../selectors');

const allProducts = require('./products-urls-extract');

const getProductsDetails = async (productUrl) => {
    const $ = await domParser.initDomParser(productUrl);
    const monitorChars = {};
    const $monitorDetails = [...$(TECHNOPOLIS.monitorDetails).children()];
    $monitorDetails.forEach((child, index, arr) => {
        if (index % 2 === 0) {
            monitorChars[child.innerHTML] = '';
        } else {
            if (child.innerHTML.indexOf('НЕ') > 0) {
                monitorChars[arr[index - 1].innerHTML] = 'NO';
            } else if (child.innerHTML.indexOf('ДА') > 0) {
                monitorChars[arr[index - 1].innerHTML] = 'YES';
            } else {
                monitorChars[arr[index - 1].innerHTML] = child.innerHTML;
            }
        }
    });

    return monitorChars;
};

const getAllProductsDetails = async () => {
    const allProductsUrls = await allProducts.
    getAllProducts(TECHNOPOLIS.url, 0);
    const products = await Promise.all(allProductsUrls.map((url) => {
            url = TECHNOPOLIS.mainUrl + url;
            const allDetails = getProductsDetails(url);
            return allDetails;
        }));
    return products;
};

module.exports = {
    getAllProductsDetails,
};
