// Creation des TABLES et DATAFIELDS pour la DB Groupomania et du Model: User
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    firstName: {
      type: Sequelize.STRING,
      required: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    pseudo: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
  });
  return User;
};
