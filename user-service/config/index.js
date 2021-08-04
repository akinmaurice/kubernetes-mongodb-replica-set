const path = require('path');
const util = require('util');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT|| 3023,
  root: path.normalize(`${__dirname}/..`),
  SERVICE_NAME: 'User Service',
  DATABASE_URI: process.env.DATABASE_URI
};