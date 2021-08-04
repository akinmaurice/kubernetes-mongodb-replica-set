const mongoose = require('mongoose');
const config = require('../');


mongoose.connect(config.DATABASE_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;

mongoose.connection.on('connect', function() {
    logger.info('Database has connected successfully');
});

mongoose.connection.on('error', (err) => {
    logger.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});