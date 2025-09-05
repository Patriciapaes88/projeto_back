'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('declaracoes', null, {});
    await queryInterface.bulkInsert('declaracoes', [
      {
        id: 1,
        aluno_id: 1,
        tipo: 'Histórico Escolar',
        status: 'emitido',
        data_solicitacao: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('declaracoes', null, {});
  }
};
