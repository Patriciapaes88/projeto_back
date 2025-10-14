'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('matriculas', null, {});
    await queryInterface.bulkInsert('matriculas', [
      {
        aluno_id: 1,
        turma_id: 101,
        data_matricula: new Date(),
        turno: 'Manhã',
        tipo_matricula: 'Nova',
        responsavel: 'Maria da Silva',
        documentos_entregues: 'RG, CPF, comprovante de residência',
        observacoes: 'Aluno transferido de outra escola',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aluno_id: 2,
        turma_id: 102,
        data_matricula: new Date(),
        turno: 'Tarde',
        tipo_matricula: 'Renovação_de_matrícula',
        responsavel: 'João Pereira',
        documentos_entregues: 'RG, certidão de nascimento',
        observacoes: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('matriculas', null, {});
  }
};
