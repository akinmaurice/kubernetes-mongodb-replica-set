const path = require('path');
const util = require('util');

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  root: path.normalize(`${__dirname}/..`),
  SERVICE_NAME: 'User Service',
};