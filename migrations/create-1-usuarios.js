'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING(100) },
      email: { type: Sequelize.STRING(100), unique: true },
      senha: { type: Sequelize.STRING(255) },
      cargo: { type: Sequelize.STRING(50), allowNull: false },
      cpf: { type: Sequelize.STRING(14), unique: true },         // novo campo
      telefone: { type: Sequelize.STRING(20) }, // novo campo
      resetToken: { type: Sequelize.STRING(255) },
      resetTokenExpira: { type: Sequelize.DATE },
      token_recuperacao: { type: Sequelize.STRING(64) },
      expiracao_token: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('usuarios');
  }
};
