'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documentos_upload', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'alunos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nome_arquivo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      caminho_arquivo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      data_upload: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('documentos_upload');
  }
};
