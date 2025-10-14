'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('permissoes', null, {});
    await queryInterface.bulkInsert('permissoes', [
      {
        usuario_id: 3,
        recurso: 'gerenciar_alunos',
        permitido: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuario_id: 4,
        recurso: 'visualizar_relatorios',
        permitido: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuario_id: 5,
        recurso: 'editar_documentos',
        permitido: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('permissoes', null, {});
  }
};
