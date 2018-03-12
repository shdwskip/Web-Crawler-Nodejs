const domParser = require('../../dom-parser');
const {
    TECHNOPOLIS,
} = require('../../selectors');

const {
    getAllProductsUrls,
} = require('./products-urls-extract');

const _ = require('lodash');

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

const parseProductDetails = async (child, index, arr, monitorChars) => {
    if (index % 2 === 0) {
        child = child.innerHTML;
        let nextChild = arr[index + 1].innerHTML;
        if (child === 'Марка') {
            monitorChars.vendor = nextChild.toLowerCase();
        } else if (child === 'МОДЕЛ') {
            monitorChars.model = nextChild;
        } else if (child === 'ДИСПЛЕЙ') {
            nextChild = nextChild.split(', ');
            monitorChars.display = nextChild[nextChild.length - 1];
        } else if (child === 'РАЗМЕР НА ЕКРАНА В INCH') {
            monitorChars.size = nextChild;
        } else if (child === 'РЕЗОЛЮЦИЯ') {
            nextChild = nextChild.split(/[x@]/i);
            monitorChars.resolution = nextChild[0] + ' x ' + nextChild[1];
        } else if (child === 'ГАРАНЦИЯ') {
            monitorChars.warranty = nextChild.toLowerCase();
        } else if (child === 'ИНТЕРФЕЙС') {
            if (nextChild.indexOf('HDMI') > 0) {
                monitorChars.hdmi = 'YES';
            }
            if (nextChild.indexOf('D.Port') > 0) {
                monitorChars.display_port = 'YES';
            }
        } else if (child === 'ЦВЯТ') {
            monitorChars.color = nextChild.toLowerCase();
        }
    }
};
const getProductDetails = async (productUrl) => {
    const $ = await domParser.initDomParser(productUrl);
    const monitorPrice = await getProductPrice($);
    const monitorImage = await getProductImage($);
    const monitorChars = {
        store: 'TECHNOPOLIS',
        price: monitorPrice,
        picture: monitorImage,
        vendor: '',
        model: '',
        display: '',
        size: '',
        resolution: '',
        warranty: '',
        hdmi: 'NO',
        display_port: 'NO',
        color: '',
    };
    const $monitorDetails = [...$(TECHNOPOLIS.monitorDetails).children()];
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
        url = TECHNOPOLIS.mainUrl + url;
        return getProductDetails(url);
    })));
    return getAllByChunks(allProductsUrls, allDetails);
};

const getAllProductsDetails = async () => {
    const allProductsUrls = await getAllProductsUrls(TECHNOPOLIS.url, 0);
    const allProductsDetails = await getAllByChunks(allProductsUrls, []);
    return _.flatten(allProductsDetails);
};

module.exports = {
    getAllProductsDetails,
};
