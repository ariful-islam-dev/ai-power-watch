const generateQueryString = (query) => {
   const result = Object.keys(query).map(key=>encodeURIComponent(key)+"="+encodeURIComponent(query[key]));

    return result.join("&")
};

module.exports = generateQueryString;