const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarioRoutes');
const db = require('./config/db'); // conexão com MySQL
dotenv.config();
const alunoRoutes = require('./routes/alunoRoutes');




const verificarPermissao = require('./middlewares/verificarPermissao');
const { definirPermissoesUsuario } = require('./controllers/usuarioController');

const app = express();

// Middleware
app.use(express.json());

// Rotas
app.use('/api/usuario', usuarioRoutes);
app.use('/api/aluno', alunoRoutes);


// Nova rota protegida
app.post('/teste/:id', verificarPermissao('gerenciar_permissoes'), definirPermissoesUsuario);



//conexao com banco
db.query('SELECT 1')
  .then(() => {
    console.log('Conectado ao banco de dados MySQL');
    app.listen(4000, () => {
      console.log('Servidor rodando na porta 4000');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
    process.exit(1);
  });





