require('dotenv').config();
const express = require('express');


const expressConfig = require('./config/express');


const port = process.env.PORT || 3023;
const app = express();
expressConfig(app);


app.listen(port);
logger.info(`Server started on Port ${port}`);

process.on('unhandledRejection', (reason) => {
    logger.error('unhandledRejection', reason);
});

module.exports = app;