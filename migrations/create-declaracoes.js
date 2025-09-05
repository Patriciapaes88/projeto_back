'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('declaracoes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      aluno_id: { type: Sequelize.INTEGER, allowNull: false },
      tipo: { type: Sequelize.STRING(100), allowNull: false },
      status: { type: Sequelize.STRING(50), allowNull: false },
      data_solicitacao: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('declaracoes');
  }
};
