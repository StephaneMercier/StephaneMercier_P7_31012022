"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Comments"),
      {
        fields: ["postId"],
        type: "foreignKey",
        name: "comment-post-association",
        onDelete: "cascade",
        references: {
          table: "Posts",
          field: "id",
        },
      };
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Comments",
      "comment-post-association"
    );
  },
};
