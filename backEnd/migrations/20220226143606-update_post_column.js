"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Posts", "title", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Posts", "body", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
