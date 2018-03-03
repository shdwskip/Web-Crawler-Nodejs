const {
    getAllProductsUrls,
    getTotalPages,
    getAllProductsDetails,
} = require('./extract');

const {
    TECHNOPOLIS,
} = require('./selectors');

const run = async () => {
    const pages = await getTotalPages();
    console.log('PAGES:', pages);
    const allProducts = await getAllProductsUrls(TECHNOPOLIS.url, 0);
    console.log(allProducts);
    const details = await getAllProductsDetails();
    console.log('================================');
    details.forEach((monitor) => console.log(monitor));
    return pages;
};

run();
