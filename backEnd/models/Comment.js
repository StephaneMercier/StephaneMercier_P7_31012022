"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // Associate comments with userIs and PostIds
      models.Comment.belongsTo(models.User, {
        foreignKey: { name: "userId", allowNull: false },
      });
      models.Comment.belongsTo(
        models.Post,
        {
          foreignKey: { name: "userId", allowNull: false },
        },
        // Using "cascade" to delete related comments when the user/post is deleted
        { onDelete: "cascade" }
      );
    }
  }
  Comment.init(
    {
      body: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      postId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  return Comment;
};
