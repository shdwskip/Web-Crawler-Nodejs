const domParser = require('../dom-parser');
const {
    DESKTOPBG,
} = require('../selectors');

const {
    getProductsWithNoPromos,
} = require('./desktopbg-urls-extract');

const getProductModel = async ($) => {
    const [vendor, model] = $(DESKTOPBG.monitorVendor)[0].innerHTML
        .replace(/\s/, '')
        .split(' ');
    return [vendor.replace(/\s/g, ''), model.replace(/\s/g, '')];
};
const getProductPrice = async ($) => {
    const $price = +($(DESKTOPBG.priceValue)[0].innerHTML);
    return $price.toFixed(2);
};

const getProductImage = async ($) => {
    const $imageUrl = DESKTOPBG.mainUrl +
        $(DESKTOPBG.productImage).attr('src');
    return $imageUrl;
};

const getProductDetails = async (productUrl) => {
    const $ = await domParser.initDomParser(productUrl);
    const monitorPrice = await getProductPrice($);
    const monitorImage = await getProductImage($);
    const [vendor, model] = await getProductModel($);
    const monitorChars = {
        Цена: monitorPrice,
        Снимка: monitorImage,
        Марка: vendor,
        МОДЕЛ: model,
    };
    const $monitorDetails = [...$(DESKTOPBG.monitorDetails).children()];
    $monitorDetails.forEach((child, index, arr) => {
        child = child.innerHTML.replace(/\n/g, '');
        let previousChild;
        if (index > 0) {
            previousChild = arr[index - 1].innerHTML.replace(/\n/g, '');
        }

        if (child === 'Технологии' || child === 'Входове и изходи' ||
            previousChild === 'Технологии' ||
            previousChild === 'Входове и изходи') {
                return;
        }

        if (index % 2 === 0 && typeof monitorChars[child] === 'undefined') {
            monitorChars[child] = '';
        } else {
            if (child.indexOf('Не') > 0) {
                monitorChars[previousChild] = 'NO';
            } else if (child.indexOf('Да') > 0) {
                monitorChars[previousChild] = 'YES';
            } else if (child.indexOf('color') > 0) {
                const startIndex = child.indexOf('">') + 2;
                const endIndex = child.indexOf('</');
                child = child.substring(startIndex, endIndex);
                monitorChars[previousChild] = child;
            } else if (monitorChars[previousChild] === '') {
                monitorChars[previousChild] = child;
            }
        }
    });
    console.log(monitorChars);
    return monitorChars;
};

const getAllByChunks = async (allProductsUrls, allDetails) => {
    if (allProductsUrls.length === 0) {
        return allDetails;
    }

    const queue = allProductsUrls.splice(0, 5);

    allDetails.push(await Promise.all(queue.map((url) => {
        return getProductDetails(url);
    })));
    return getAllByChunks(allProductsUrls, allDetails);
};

const getAllProductsDetails = async () => {
    const allProductsUrls = await getProductsWithNoPromos();
    const allProductsDetails = await getAllByChunks(allProductsUrls, []);
    return allProductsDetails;
};

const run = async () => {
    const test = await getAllProductsDetails();
    // console.log(test);
};

run();
module.exports = {
    getAllProductsDetails,
};