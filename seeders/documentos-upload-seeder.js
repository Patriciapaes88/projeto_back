'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('documentos_upload', null, {});
    await queryInterface.bulkInsert('documentos_upload', [
      {
        id: 1,
        aluno_id: 1,
        nome_arquivo: 'cpf.pdf',
        caminho: '/uploads/cpf.pdf',
        tipo: 'pdf',
        criado_em: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('documentos_upload', null, {});
  }
};
