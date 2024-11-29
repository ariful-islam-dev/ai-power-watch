const defaultConfig = require("../config/default");
const generateQueryString = require("./qs");

const getTransformItems = (items = [], selection = [], path = "/") => {
  if (!Array.isArray(items) && !Array.isArray(selection)) {
    throw new Error("Invalid Arguments");
  }

  if (selection.length === 0) {
    return items.map((item) => ({
      ...item,
      link: `${path}/${item._id}`,
    }));
  }

  return items.map((item) => {
    const result = {};
    if(!item.id) item.id = item._id;
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item._id}`;
    return result;
  });
};

// @pagination
const getPagination = (
  totalItems = defaultConfig.totalItems,
  page = defaultConfig.page,
  limit = defaultConfig.limit
) => {
  const totalPages = Math.ceil(totalItems / limit);

  const pagination = {
    page,
    limit,
    totalItems,
    totalPages,
  };

  if (page < totalPages) {
    pagination.next = page + 1;
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};

// req.url,
// !!pagination.next,
// !!pagination.prev,
// page,
// req.path,
// req.query

const getHeteOSItems = (
  url = "/",
  hasNext = false,
  hasPrev = false,
  page = 1,
  path = "",
  query = {}
) => {

  // console.log(url, hasNext, hasPrev, page, path, query)

  
  
  
  const links = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({ ...query, page: page + 1 });
    links.next = `${path}?${queryStr}`;
  }
 
  
  if (hasPrev) {
    const queryStr = generateQueryString({ ...query, page: page - 1 });
  
    links.prev = `${path}?${queryStr}`;
  }
  

  return links;
};

module.exports = {
  getTransformItems,
  getPagination,
  getHeteOSItems,
};
