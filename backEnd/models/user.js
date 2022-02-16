"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Create a One-to-many relationship between User and Post
    static associate(models) {
      models.User.hasMany(models.Post, {
        sourceKey: "id",
        foreignKey: "id",
      });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false, required: true },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
      },
      isAdmin: { type: DataTypes.BOOLEAN, default: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
