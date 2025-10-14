'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('termos', null, {});
    await queryInterface.bulkInsert('termos', [
      {
        aluno_id: 1,
        tipo: 'compromisso',
        descricao: 'O responsável se compromete a acompanhar o desempenho escolar do aluno.',
        data_assinatura: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aluno_id: 2,
        tipo: 'ciência',
        descricao: 'O responsável declara estar ciente das regras disciplinares da instituição.',
        data_assinatura: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('termos', null, {});
  }
};
