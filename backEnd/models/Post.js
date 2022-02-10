"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // associating comments with the posts (One-to-Many)
      models.Post.hasMany(
        models.Comment,
        { foreignKey: "postId" },
        { onDelete: "cascade" }
      );
      // One User has many Post so Posts belongsTo User
      models.Post.belongsTo(models.User), { as: "user", foreignKey: "userId" };
    }
  }
  Post.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
