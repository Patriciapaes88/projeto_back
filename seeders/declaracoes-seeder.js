'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('declaracoes', null, {});
    await queryInterface.bulkInsert('declaracoes', [
      {
        aluno_id: 1,
        tipo: 'Histórico Escolar',
        conteudo: 'Declara que o aluno concluiu o ensino fundamental.',
        status: 'emitido',
        data_emissao: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('declaracoes', null, {});
  }
};
