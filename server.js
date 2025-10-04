const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // <--- importar o cors
const usuarioRoutes = require("./routes/usuarioRoutes");
const alunoRoutes = require("./routes/alunoRoutes");

const verificarPermissao = require("./middlewares/verificarPermissao");
const { definirPermissoesUsuario } = require("./controllers/usuarioController");
const db = require("./config/db"); // conexão com MySQL

dotenv.config();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const { swaggerUi, specs } = require('./config/swagger');
// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Habilitar CORS (pode restringir a origem se quiser mais seguro)
app.use(
  cors({
    origin: "http://localhost:5173", // libera apenas seu front
    methods: ["GET", "POST", "PUT", "DELETE"], // métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // cabeçalhos permitidos
  })
);

// Rotas
app.use("/api/usuario", usuarioRoutes);
app.use("/api/aluno", alunoRoutes);

// Nova rota protegida
app.post(
  "/teste/:id",
  verificarPermissao("gerenciar_permissoes"),
  definirPermissoesUsuario
);

// Conexão com banco
db.query("SELECT 1")
  .then(() => {
    console.log("Conectado ao banco de dados MySQL");
    app.listen(4000, () => {
      console.log("Servidor rodando na porta 4000");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err);
    process.exit(1);
  });
