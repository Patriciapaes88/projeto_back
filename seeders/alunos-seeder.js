'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunos', null, {});
    await queryInterface.bulkInsert('alunos', [
      {
        nome: 'Maria da Silva',
        cpf: '123.456.789-00',
        rg: '1234567',
        nascimento: '2000-01-01',
        sexo: 'Feminino',
        endereco: 'Rua Exemplo, 123',
        telefone: '51999999999',
        certidao_nascimento: 'Certidão 123',
        nis: '123456789',
        bolsa_familia: false,
        alergias: 'Nenhuma',
        deficiencia: null,
        cor_raca: 'Branca',
        nacionalidade: 'Brasileira',
        naturalidade: 'Porto Alegre',
        nome_social: null,
        nome_afetivo: null,
        filiacao_pai: 'João da Silva',
        filiacao_mae: 'Ana Souza',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunos', null, {});
  }
};
