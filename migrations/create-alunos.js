'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alunos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(100)
      },
      cpf: {
        type: Sequelize.STRING(14)
      },
      rg: {
        type: Sequelize.STRING(20)
      },
      nascimento: {
        type: Sequelize.DATEONLY
      },
      sexo: {
        type: Sequelize.STRING(10)
      },
      endereco: {
        type: Sequelize.TEXT
      },
      telefone: {
        type: Sequelize.STRING(20)
      },
      certidao_nascimento: {
        type: Sequelize.STRING(100)
      },
      nis: {
        type: Sequelize.STRING(20)
      },
      bolsa_familia: {
        type: Sequelize.BOOLEAN
      },
      alergias: {
        type: Sequelize.TEXT
      },
      deficiencia: {
        type: Sequelize.TEXT
      },
      cor_raca: {
        type: Sequelize.STRING(20)
      },
      nacionalidade: {
        type: Sequelize.STRING(50)
      },
      naturalidade: {
        type: Sequelize.STRING(50)
      },
      nome_social: {
        type: Sequelize.STRING(100)
      },
      nome_afetivo: {
        type: Sequelize.STRING(100)
      },
      filiacao_pai: {
        type: Sequelize.STRING(100)
      },
      filiacao_mae: {
        type: Sequelize.STRING(100)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alunos');
  }
};
