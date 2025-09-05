'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('transferencias', null, {});
    await queryInterface.bulkInsert('transferencias', [
      {
        id: 1,
        aluno_id: 2,
        escola_origem: 'Escola Estadual A',
        escola_destino: 'Escola Estadual B',
        status: 'concluída',
        data_transferencia: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('transferencias', null, {});
  }
};
