require('dotenv').config();
const express = require('express');


const expressConfig = require('./config/express');
const config = require('./config');
require('./config/db');


const port = config.port;
const app = express();
expressConfig(app);


app.listen(port);
logger.info(`Server started on Port ${port}`);

process.on('unhandledRejection', (reason) => {
    errorHandler('unhandledRejection: '+ reason);
});

module.exports = app;