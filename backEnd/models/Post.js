module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.String,
      default: "Titre de votre post",
      allowNull: false,
    },
    body: {
      type: Sequelize.String,
      allowNull: false,
    },
    userId: {
      type: Sequelize.Number,
      allowNull: false,
      unique: true,
    },
    url_media: {
      type: Sequelize.String,
    },
    type: {
      image: Sequelize.LONGBLOB,
      text: Sequelize.String,
    },
  });
  return Post;
};
