const generateQueryString = (query) => {
    return Object.keys(query)
        .map((key)=>encodeURIComponent(key) + "=" +encodeURIComponent(query[key])).json("&");
};

module.exports = generateQueryString;