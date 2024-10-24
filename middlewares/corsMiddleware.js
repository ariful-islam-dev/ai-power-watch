const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // React frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const allowCors = cors(corsOptions);

module.exports = { allowCors };
