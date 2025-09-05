'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkDelete('usuarios', null, {});

    await queryInterface.bulkInsert('usuarios', [
      {
        id: 3,
        nome: 'Luan Nunes',
        email: 'luan.nunes@escola.com',
        senha: '$2b$10$IqJzVUv6ujZTgs.K/y1NXOmXosFOf3EqEFbVC3YaN389q2DIIkx3K',
        cargo: 'diretor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nome: 'Patricia',
        email: 'patricia.paes@escola.com',
        senha: '$2b$10$NXQ/fG4LxxfoTfnF/xvAQ.8xjZN2kBX2wFhMeS6QVwo4hliIydjnC',
        cargo: 'diretor_adjunto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nome: 'Beatriz',
        email: 'beatriz@example.com',
        senha: '$2b$10$Ndzb0eQ30ZQ0Z/VC6OczWOXBZahv4v2TlNZm8Iv0Z7mUU1zNrKMJG',
        cargo: 'secretaria',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
