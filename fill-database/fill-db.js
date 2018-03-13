const _ = require('lodash');
const chalk = require('chalk');

const {
    vendor,
    model,
    spec,
    store,
} = require('../database/models');

const {
    getAllProductsDetails,
    getAllMonitorsDesktopBg,
} = require('../extract');

const addMonitor = async (obj) => {
    const foundMonitor = await model.findAll({
        where: {
            picture: obj.picture,
        },
    });

    if (foundMonitor.length === 0) {
        const vendors = await vendor.findCreateFind({
            where: {
                name: obj.vendor,
            },
        });

        const models = await model.create({
            name: obj.model,
            picture: obj.picture,
            price: obj.price,
            vendorId: vendors[0].id,
        });

        const stores = await store.findCreateFind({
            where: {
                name: obj.store,
            },
        });

        const specsObj = {
            display: obj.display,
            size: obj.size,
            resolution: obj.resolution,
            warranty: obj.warranty,
            hdmi: obj.hdmi,
            display_port: obj.display_port,
            color: obj.color,
        };

        let keys = Object.keys(specsObj);

        keys = await Promise.all(keys.map(async (key) => {
            const currentSpec = await spec.findCreateFind({
                where: {
                    type: key,
                    value: specsObj[key],
                },
            });
            return currentSpec[0].id;
        }));

        models.setSpecs(keys);
        models.setStores([stores[0].id]);
    }
};

const saveMonitorsInDb = async () => {
    const data = _.flatten(await Promise.all(
        [getAllMonitorsDesktopBg(),
            getAllProductsDetails(),
        ]));
    console.log(chalk.green.bold('Done scraping!'));

    await Promise.all(data.map((monitor) => {
        return addMonitor(monitor);
    }));
    console.log(chalk.green.bold('Database filled!'));
};

module.exports = {
    saveMonitorsInDb,
};
