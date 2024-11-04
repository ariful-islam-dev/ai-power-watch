const generateQueryString = require("./qs");
const { getTransformItems, getPagination, getHeteOSItems } = require("./query");

const qs = {generateQueryString};

const query = {
    getTransformItems,
    getPagination,
    getHeteOSItems
}

module.exports = {qs, query}