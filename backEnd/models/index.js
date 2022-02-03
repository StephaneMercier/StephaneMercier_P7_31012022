// Requête de Sequelize à partir du fichier "config"
const dbConfig = require("../config/database_config");
const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Sequelize = sequelizeInstance;
db.users = require("./users")(sequelizeInstance, Sequelize);

module.exports = db;
