// Connecting to the MySQL DB and setting the pool to ensure good application performance
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: process.env.PASSWORD_MYSQL,
  DB: process.env.DB_MYSQL,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
