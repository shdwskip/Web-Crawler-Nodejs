const domParser = require('../../dom-parser');
const {
    DESKTOPBG,
} = require('../../selectors');

const {
    getProductsWithNoPromos,
} = require('./desktopbg-urls-extract');

const _ = require('lodash');

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

const parseProductDetails = async (child, index, arr, monitorChars) => {
    if (index % 2 === 0) {
        child = child.innerHTML.replace(/\n/g, '');
        let nextChild = arr[index + 1].innerHTML.replace(/\n/g, '');
        if (child === 'Тип подсветка') {
            monitorChars.display = nextChild;
        } else if (child === 'Екран') {
            nextChild = nextChild.split(' инча ');
            monitorChars.size = nextChild[0] + ' "';
        } else if (child === 'Резолюция') {
            nextChild = nextChild.split(' (');
            monitorChars.resolution = nextChild[0];
        } else if (child === 'Гаранция') {
            nextChild = nextChild.split(' гаранция');
            monitorChars.warranty = nextChild[0];
        } else if (child === 'HDMI' && nextChild.indexOf('Да') > 0) {
            monitorChars.hdmi = 'YES';
        } else if (child === 'DisplayPort' && nextChild.indexOf('Да') > 0) {
            monitorChars.display_port = 'YES';
        } else if (child === 'Цвят на корпуса') {
            const startIndex = nextChild.indexOf('">') + 2;
            const endIndex = nextChild.indexOf('</');
            nextChild = nextChild.substring(startIndex, endIndex);
            monitorChars.color = nextChild.toLowerCase();
        }
    }
};

const getProductDetails = async (productUrl) => {
    const $ = await domParser.initDomParser(productUrl);
    const monitorPrice = await getProductPrice($);
    const monitorImage = await getProductImage($);
    const [vendor, model] = await getProductModel($);
    const monitorChars = {
        store: 'DESKTOPBG',
        price: monitorPrice,
        picture: monitorImage,
        vendor: vendor.toLowerCase(),
        model,
        display: '',
        size: '',
        resolution: '',
        warranty: '',
        hdmi: 'NO',
        display_port: 'NO',
        color: '',
    };
    const $monitorDetails = [...$(DESKTOPBG.monitorDetails).children()];
    $monitorDetails.forEach((child, index, arr) => {
        return parseProductDetails(child, index, arr, monitorChars);
    });

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

const getAllMonitorsDesktopBg = async () => {
    const allProductsUrls = await getProductsWithNoPromos();
    const allProductsDetails = await getAllByChunks(allProductsUrls, []);
    return _.flatten(allProductsDetails);
};

// const run = async () => {
//     const test = await getAllMonitorsDesktopBg();
// };

// run();
module.exports = {
    getAllMonitorsDesktopBg,
};
