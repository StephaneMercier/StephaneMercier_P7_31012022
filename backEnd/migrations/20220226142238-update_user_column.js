"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "password", {
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
    await queryInterface.dropTable("Users");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
