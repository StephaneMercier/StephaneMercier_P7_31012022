"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Posts"),
      {
        field: ["UserId"],
        type: "foreignKey",
        onDelete: "cascade",
        name: "post-user-association",
        references: {
          table: "Users",
          field: "id",
        },
      };
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Posts", "post-user-association");
  },
};
