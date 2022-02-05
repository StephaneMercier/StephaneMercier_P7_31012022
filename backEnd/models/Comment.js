module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: String,
    },
    userId: {
      type: Number,
      allowNull: false,
    },
    postId: {
      type: Number,
      allowNull: false,
    },
  });
  return Comment;
};
