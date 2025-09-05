'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('matriculas', null, {});
    await queryInterface.bulkInsert('matriculas', [
      {
        id: 1,
        aluno_id: 1,
        curso: 'Engenharia de Software',
        turma: '2023A',
        status: 'ativo',
        data_matricula: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        aluno_id: 2,
        curso: 'Ciência da Computação',
        turma: '2023B',
        status: 'ativo',
        data_matricula: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface) {
    await queryInterface.bulkDelete('matriculas', null, {});
  }
};
