const fs = require('fs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const FileStreamRotator = require('file-stream-rotator');
const httpStatus = require('http-status');

const config = require('./');
const routes = require('../routes');
const starterInit = require('./starter');
const errorHandler = require('./error');
const loggerInit = require('./logger');
const logger = loggerInit();

const logDirectory = './log';
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const expressConfig = (app) => {
    let accessLogStream;
    global.logger = logger;
    global.errorHandler = errorHandler;

    logger.info(`${config.SERVICE_NAME} API starting...`);
    logger.debug("Overriding 'Express' logger");


    if (checkLogDir) {
        accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: `${logDirectory}/server-%DATE%.log`,
            frequency: 'weekly',
            verbose: false
        });
    }


    app.use(morgan('combined', { stream: accessLogStream }));


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    app.use(helmet());
    app.disable('x-powered-by');

    app.use(starterInit.corsInit());


    app.use(starterInit.requestId());
        
    app.use('/', routes);

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            logger.error(err);
            res.status(err.status || 500).send({
                message: err.message,
                error: err
            });
        });
    }

    app.use(function(err, req, res, next) {
        logger.error(err);
        res.status(err.status || 500).send({
            message: err.message,
            error: {}
        });
    });
    };

module.exports = expressConfig;