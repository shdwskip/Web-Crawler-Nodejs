const {
    getAllProductsUrls,
    getTotalPages,
    getAllProductsDetails,
    getAllMonitorsDesktopBg,
    getProductsWithNoPromos,
} = require('./extract');

const {
    saveMonitorsInDb,
} = require('./interact-database');

const {
    TECHNOPOLIS,
    DESKTOPBG,
} = require('./selectors');

const run = async () => {
    // const pages = await getTotalPages();
    // console.log('PAGES:', pages);
    // const allProducts = await getAllProductsUrls(TECHNOPOLIS.url, 0);
    // console.log(allProducts);
    console.log('===========TECHNOPOLIS=============');
    const details = await getAllProductsDetails();
    details.forEach((monitor) => console.log(monitor));
    // console.log('================================');
    console.log('==========DESKTOPBG=================');
    // const desktopbgUrls = await getProductsWithNoPromos();
    // console.log(desktopbgUrls);
    const desktopbgMonitors = await getAllMonitorsDesktopBg();
    desktopbgMonitors.forEach((monitor) => console.log(monitor));
    // await saveMonitorsInDb();
};

run();
