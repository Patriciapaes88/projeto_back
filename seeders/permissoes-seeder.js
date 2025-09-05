'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('permissoes', null, {});
    await queryInterface.bulkInsert('permissoes', [
      {
        id: 1,
        usuario_id: 3,
        tipo: 'diretor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        usuario_id: 4,
        tipo: 'diretor_adjunto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        usuario_id: 5,
        tipo: 'secretaria',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('permissoes', null, {});
  }
};
