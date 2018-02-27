const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const initDomParser = async (url) => {
    const dom = await JSDOM.fromURL(url);
    return new Promise((resolve) => {
        const $ = $init(dom.window);
        resolve($);
    });
};

module.exports = {
    initDomParser,
};
