const _ = require('lodash');

const {
    vendor,
    model,
    spec,
    store,
} = require('../../database/models');

const {
    getAllProductsDetails,
    getAllMonitorsDesktopBg,
} = require('../../extract');

const testMonitors = [{
        store: 'TECHNOPOLIS',
        price: '129.00',
        picture: 'http://www.technopolis.bg/medias/sys_master/h63/hd4/10366060167198.jpg',
        vendor: 'acer',
        model: 'EB192Qb',
        display: 'МАТОВ',
        size: '18.5 "',
        resolution: '1366 x 768',
        warranty: '24 месеца',
        hdmi: 'NO',
        display_port: 'NO',
        color: 'черен',
    },
    {
        store: 'TECHNOPOLIS',
        price: '239.00',
        picture: 'http://www.technopolis.bg/medias/sys_master/h6b/h94/9870642348062.jpg',
        vendor: 'philips',
        model: '227E6LDAD/00',
        display: 'LCD',
        size: '21.5 "',
        resolution: '1920 x 1080',
        warranty: '24 месеца',
        hdmi: 'NO',
        display_port: 'NO',
        color: 'черен',
    },
    {
        store: 'TECHNOPOLIS',
        price: '229.00',
        picture: 'http://www.technopolis.bg/medias/sys_master/h4e/hb4/9911779000350.jpg',
        vendor: 'philips',
        model: '227E7QDSB/00',
        display: 'IPS',
        size: '21.5 "',
        resolution: '1920 x 1080',
        warranty: '24 месеца',
        hdmi: 'YES',
        display_port: 'NO',
        color: 'черен',
    },
    {
        store: 'DESKTOPBG',
        price: '579.00',
        picture: 'https://www.desktop.bg/system/images/145928/normal/328E8QJAB5.jpg',
        vendor: 'philips',
        model: '328E8QJAB5',
        display: 'WLED',
        size: '31.5 "',
        resolution: '1920 x 1080',
        warranty: '24 месеца',
        hdmi: 'YES',
        display_port: 'YES',
        color: 'черен',
    },
    {
        store: 'TECHNOPOLIS',
        price: '145.00',
        picture: 'http://www.technopolis.bg/medias/sys_master/h57/h8b/8806149226526.jpg',
        vendor: 'philips',
        model: '193V5LSB2/10',
        display: 'LED',
        size: '18.5 "',
        resolution: '1366 x 768',
        warranty: '24 месеца',
        hdmi: 'NO',
        display_port: 'NO',
        color: 'черен',
    },
    {
        store: 'DESKTOPBG',
        price: '589.00',
        picture: 'https://www.desktop.bg/system/images/79087/normal/24GM77B.jpg',
        vendor: 'lg',
        model: '24GM77-B',
        display: 'LED',
        size: '24 "',
        resolution: '1920 x 1080',
        warranty: '36 месеца',
        hdmi: 'YES',
        display_port: 'YES',
        color: 'черен',
    },
];

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
    const data = _.flatten(
        [await getAllMonitorsDesktopBg(),
        await getAllProductsDetails()]);
    console.log('Done scraping!');
    await Promise.all(data.map((monitor) => {
        return addMonitor(monitor);
    }));
};

const run = async () => {
    await saveMonitorsInDb();
    console.log('Finished!');
};

run();

module.exports = {
    saveMonitorsInDb,
};
