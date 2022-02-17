"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Comments"),
      {
        fields: ["userId"],
        type: "foreignKey",
        name: "comment-user-association",
        onDelete: "cascade",
        references: {
          table: "Users",
          field: "id",
        },
      };
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Comments",
      "comment-user-association"
    );
  },
};
