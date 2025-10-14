'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('documentos_upload', null, {});
    await queryInterface.bulkInsert('documentos_upload', [
      {
        aluno_id: 1,
        nome_arquivo: 'cpf.pdf',
        caminho_arquivo: '/uploads/cpf.pdf',
        data_upload: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('documentos_upload', null, {});
  }
};
