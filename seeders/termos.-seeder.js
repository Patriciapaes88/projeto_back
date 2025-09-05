'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('termos', null, {});
    await queryInterface.bulkInsert('termos', [
      {
        id: 1,
        titulo: 'Termo de Uso',
        conteudo: 'Este é o termo de uso do sistema escolar.',
        criado_em: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('termos', null, {});
  }
};
