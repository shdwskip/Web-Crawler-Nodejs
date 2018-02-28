// const url = 'http://www.technopolis.bg/bg//%D0%9A%D0%BE%D0%BC%D0%BF%D1%8E%D1%82%D1%80%D0%B8-%D0%B8-%D0%BF%D0%B5%D1%80%D0%B8%D1%84%D0%B5%D1%80%D0%B8%D1%8F/%D0%9C%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B8/c/P11010301?page=0&pageselect=48&q=:price-asc&text=&layout=List&sort=price-asc';

// const domParser = require('./dom-parser');
// const getProductsFromCurrentPage = async (urlLink) => {
//     const $ = await domParser.initDomParser(urlLink);
//     const $productLink = $('.product-box .text h2 a'); // attr('href');
//     return [...$productLink].map((link) => $(link))
//         .map(($link) => $link.attr('href'));
// };

// const calculateAllPages = (total, displayed) => Math.ceil(total / displayed);

// const getTotalPages = async () => {
//     const $ = await domParser.initDomParser(url);
//     const $allProductsSelector = $('.top-filter form fieldset ol label span');
//     const totalProducts = +$allProductsSelector.html().trim();
//     const productsByPage = 48;
//     const allPages = calculateAllPages(totalProducts, productsByPage);
//     return allPages;
// };
// const pageUrls = async () => {
//     const allUrls = await getPageUrls();

//     const monitorsUrls = await Promise.all(
//         allUrls.map((link) => getPageUrls(link)));

//     // return
// };

// const currentPage = 0;

// const getAllProducts = async (link, page) => {
//     const currentProducts = await getProductsFromCurrentPage(link);
//     if (currentProducts.length === 0) {
//         return [];
//     }
//     const restOfLink = link.slice(link.indexOf('page=') + 6);
//     link = link.substring(0, link.indexOf('page=') + 5) +
//         (page + 1) + restOfLink;
//     const nextProducts = await getAllProducts(link, page + 1);

//     return [...currentProducts, ...nextProducts];
// };

const {
    getAllProducts,
    getTotalPages,
} = require('./extract');

const {
    TECHNOPOLIS,
} = require('./selectors');

const run = async () => {
    const pages = await getTotalPages.getTotalPages();
    console.log('PAGES:', pages);
    const allProducts = await getAllProducts.getAllProducts(TECHNOPOLIS.url, 0);
    console.log(allProducts);
    return pages;
};

run();

console.log(TECHNOPOLIS.totalMonitors);
// console.log(getTotalPages);
// console.log(getAllProducts);
