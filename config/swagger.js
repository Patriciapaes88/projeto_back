// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API da Escola',
      version: '1.0.0',
      description: 'Documentação da API de alunos, usuários e mais',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // caminhos dos arquivos com comentários Swagger
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
