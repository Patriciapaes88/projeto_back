'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matriculas', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      aluno_id: { type: Sequelize.INTEGER, allowNull: false },
      turma_id: { type: Sequelize.INTEGER, allowNull: false },
      data_matricula: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      turno: { type: Sequelize.STRING(20) },
      tipo_matricula: { type: Sequelize.STRING(50) },
      responsavel: { type: Sequelize.STRING(100) },
      documentos_entregues: { type: Sequelize.TEXT },
      observacoes: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('matriculas');
  }
};
