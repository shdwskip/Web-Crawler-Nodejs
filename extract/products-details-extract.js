const domParser = require('../dom-parser');
const {
    TECHNOPOLIS,
} = require('../selectors');

const allProducts = require('./products-urls-extract');

const getProductPrice = async ($) => {
    const $spanWithPrice = $(TECHNOPOLIS.priceValue)[0].innerHTML;
    const beforeDecimal = $spanWithPrice.substring(0,
                            $spanWithPrice.indexOf('<span'))
                            .replace(/\s/g, '');
    const afterDecimal = $spanWithPrice.substring($spanWithPrice.indexOf('sup>')
                        + 4,
                        $spanWithPrice.indexOf('</sup'));
    const totalPrice = +(beforeDecimal + '.' + afterDecimal);
    return totalPrice.toFixed(2);
};

const getProductImage = async ($) => {
    const $imageUrl = TECHNOPOLIS.mainUrl +
                    $(TECHNOPOLIS.productImage).attr('src');
    return $imageUrl;
};

const getProductsDetails = async (productUrl) => {
    const $ = await domParser.initDomParser(productUrl);
    const monitorPrice = await getProductPrice($);
    const monitorImage = await getProductImage($);
    const monitorChars = {
        Цена: monitorPrice,
        Снимка: monitorImage,
    };
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

// const run = async () => {
//     await getAllProductsDetails();
// };

// run();
module.exports = {
    getAllProductsDetails,
};
