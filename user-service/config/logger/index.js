const winston = require('winston');
const moment = require('moment');
const config = require('../index');

const errorStackFormat = winston.format(info => {
    if (info instanceof Error) {
      return Object.assign({}, info, {
        stack: info.stack,
        message: info.message
      });
    }
    return info;
  })
  
const prettyJson = winston.format.printf(info => {
    let { timestamp } = info;
    timestamp = moment(timestamp).format('YYYY-MM-DD H:mm:ss:SSS');
    const { level, message, stack } = info;
    return `[${timestamp}]: ${level}: ${stack || message}`;
});

const consoleCombineFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    errorStackFormat(),
    winston.format.colorize(),
    winston.format.timestamp(),
    prettyJson
);

const jsonCombineFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    errorStackFormat(),
    winston.format.timestamp(),
    winston.format.json()
);


const logger = () => {
    const env = config.env;
    let ret = winston.createLogger({
        defaultMeta: { 
            service: config.SERVICE_NAME,
            env,
         },
        transports: [],
        exitOnError: false
    });

    switch (env) {
        case 'production':
            ret.add(
                new winston.transports.File({
                    format: jsonCombineFormat,
                    level: 'debug',
                    filename: './server.log',
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880,
                    maxFiles: 100,
                    colorize: false,
                }));
            break;
        case 'development':
            ret.add(
                new winston.transports.Console({
                    format: consoleCombineFormat,
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                }),
            );
            ret.add(
                new winston.transports.File({
                    format: jsonCombineFormat,
                    level: 'debug',
                    filename: './server.log',
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880,
                    maxFiles: 100,
                    colorize: false,
                }));
            break;
        case 'staging':
            ret.add(
                new winston.transports.File({
                    format: jsonCombineFormat,
                    level: 'debug',
                    filename: './server.log',
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880,
                    maxFiles: 100,
                    colorize: false,
                }));
            break;
        default:
            ret.add(
                new winston.transports.Console({
                    format: consoleCombineFormat,
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true
                }),
            );
}

    ret.stream = {
        write: (message) => {
            logger.info(message);
        }
    };

    return ret;
};

module.exports = logger;
