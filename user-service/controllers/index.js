const httpStatus = require('http-status');
const UserModel = require('../models/User');


exports.seedData = async(req, res) => {
  try {
    logger.info('Seeding data');
    const users = [
      {
        firstname: 'Edgar Kulas',
        lastname: "Marvin O'Reilly",
        email: 'Forest79@hotmail.com'
      },
      {
        firstname: 'Miss Mabel Ratke',
        lastname: 'Lorenzo Bauch',
        email: 'Alexander.Rowe@gmail.com'
      },
      {
        firstname: 'Raquel Terry',
        lastname: 'Wallace Christiansen',
        email: 'Dianna_Brakus@gmail.com'
      },
      {
        firstname: 'Jo Kub',
        lastname: 'Miss Grace Bernhard',
        email: 'Savion.Feest@gmail.com'
      },
      {
        firstname: 'Laurie Fay',
        lastname: 'Thelma Steuber',
        email: 'Chad.Oberbrunner@yahoo.com'
      },
      {
        firstname: 'Lynette Runolfsson',
        lastname: 'Lloyd Fisher',
        email: 'Monserrate_Okuneva3@hotmail.com'
      },
      {
        firstname: 'Andy Kovacek',
        lastname: 'Ms. Joel Homenick',
        email: 'Chadrick23@yahoo.com'
      },
      {
        firstname: 'Gregory Boehm',
        lastname: 'Hugo Breitenberg',
        email: 'Hazel64@hotmail.com'
      },
      {
        firstname: 'Thomas Gislason',
        lastname: 'Catherine Klocko',
        email: 'Ransom.Treutel99@hotmail.com'
      },
      {
        firstname: 'Sharon Rosenbaum',
        lastname: 'Harry Krajcik',
        email: 'Adriana_Raynor13@hotmail.com'
      }
    ]
    await UserModel.insertMany(users);
    logger.info('User data seeded');
    res.status(httpStatus.CREATED);
    return res.json({
    message: 'Data seeded'
    });
  } catch (error) {
    logger.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR
    });
  }
};

exports.getUsers = async(req, res) => {
    try {
    logger.info('Getting all users');
    const users = await UserModel.find({});
    logger.info(`Fetched ${users.length} users`);
    res.status(httpStatus.OK);
    return res.json({
        users
    });
    } catch (error) {
      console.log(error);
      logger.error(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR
      });
    }
};