const winston = require('winston');
const moment = require('moment');


const prettyJson = winston.format.printf(info => {
    let { timestamp } = info;
    timestamp = moment(timestamp).format('YYYY-MM-DD H:mm:ss:SSS');
    const { level } = info;
    const { message } = info;
    return `[${timestamp}] ${level}: ${message}`;
});

const combineFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    prettyJson
);


const logger = () => {
    let ret = winston.createLogger({
                    format: combineFormat,
                    transports: [
                        new winston.transports.Console({
                            level: 'debug',
                            handleExceptions: true,
                            json: false,
                            colorize: true
                        }),
                        new winston.transports.File({
                            level: 'debug',
                            filename: './server.log',
                            handleExceptions: true,
                            json: true,
                            maxsize: 5242880,
                            maxFiles: 100,
                            colorize: true
                        })
                    ],
                    exitOnError: false
                });

    ret.stream = {
        write: (message) => {
            logger.info(message);
        }
    };

    return ret;
};

module.exports = logger;