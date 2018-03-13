const {
    vendor,
    model,
    spec,
    store,
} = require('../database/models');

const {
    saveMonitorsInDb,
} = require('../fill-database/fill-db');

const emptyTables = async () => {
    await Promise.all([
        model.destroy({
            truncate: {
                cascade: true,
            },
        }),
        spec.destroy({
            truncate: {
                cascade: true,
            },
        }),
        store.destroy({
            truncate: {
                cascade: true,
            },
        }),
        vendor.destroy({
            truncate: {
                cascade: true,
            },
        }),
    ]);
};

emptyTables();
saveMonitorsInDb();
