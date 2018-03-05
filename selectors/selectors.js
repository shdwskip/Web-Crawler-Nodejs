const TECHNOPOLIS = {
    productImage: '.preview-media img',
    priceValue: '.product-description .description .prices table .priceValue',
    totalMonitors: '.top-filter form fieldset ol label span',
    monitorsUrls: '.product-box .text h2 a',
    monitorDetails: '.table-characteristics tbody tr',
    mainUrl: 'http://www.technopolis.bg',
    url: 'http://www.technopolis.bg/bg//%D0%9A%D0%BE%D0%BC%D0%BF%D1%8E%D1%82%D1%80%D0%B8-%D0%B8-%D0%BF%D0%B5%D1%80%D0%B8%D1%84%D0%B5%D1%80%D0%B8%D1%8F/%D0%9C%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B8/c/P11010301?page=0&pageselect=48&q=:price-asc&text=&layout=List&sort=price-asc',
};

const DESKTOPBG = {
    productImage: '.product-image a img',
    priceValue: '.product-sidebar .price span:first-of-type',
    monitorVendor: '.frame header h1',
    monitorsUrls: '.products li article div:first-of-type a',
    monitorDetails: '#characteristics .product-characteristics tbody tr',
    mainUrl: 'https://www.desktop.bg',
    url: 'https://desktop.bg/displays-all?backlight_id_in_all=all&basic_color_id_in_all=all&brand_id_in_all=all&display_size_type_btw_all=all&display_type_id_in_all=all&display_type_view_id_in_all=all&list_view=true&page=1&per_page=100&price_btw_all=all&refresh_rate_id_in_all=all&resolution_id_in_all=all&search%5Bprice_gte%5D=&search%5Bprice_lte%5D=&search%5Bs%5D=price_asc&technology_panel_id_in_all=all&time_reaction_id_in_all=all&utf8=%E2%9C%93&warranty_size_btw_all=all',
};

const technomarket = {};

module.exports = {
    TECHNOPOLIS,
    DESKTOPBG,
    technomarket,
};
