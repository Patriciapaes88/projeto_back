const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarioRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const verificarPermissao = require('./middlewares/verificarPermissao');
const { definirPermissoesUsuario } = require('./controllers/usuarioController');
const db = require('./config/db'); // conexão com MySQL

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const { swaggerUi, specs } = require('./config/swagger');
// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/api/usuario', usuarioRoutes);
app.use('/api/aluno', alunoRoutes);
app.post('/teste/:id', verificarPermissao('gerenciar_permissoes'), definirPermissoesUsuario);

// Rota de teste
app.get('/api/ping', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

// Conexão com banco e inicialização do servidor
db.query('SELECT 1')
  .then(() => {
    console.log('Conectado ao banco de dados MySQL');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
    process.exit(1);
  });



