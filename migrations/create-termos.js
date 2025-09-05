'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('termos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      titulo: { type: Sequelize.STRING(255), allowNull: false },
      conteudo: { type: Sequelize.TEXT, allowNull: false },
      criado_em: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('termos');
  }
};
