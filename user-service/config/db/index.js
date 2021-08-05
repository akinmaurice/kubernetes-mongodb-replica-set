const mongoose = require('mongoose');
const config = require('../');


mongoose.connect(config.DATABASE_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

mongoose.connection.on('connect', () => {
    logger.info('Database has connected successfully');
});

mongoose.connection.on('error', (err) => {
    logger.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});