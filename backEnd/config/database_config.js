// require("dotenv").config();
// Configuring parameters for MySql connection and Sequelize
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: process.env.DB_MYSQL,
  dialect: "mysql",

  //   Sequelize connection pool config
  pool: {
    //   Maximum numb of connection
    max: 5,
    // Minimum numb of connection
    min: 0,
    // Max time (in ms) that the pool will try to connect before throwing an error
    acquire: 30000,
    // Max time (in ms) that the connection can be idle before release
    idle: 10000,
  },
};
