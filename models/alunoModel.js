
const db = require('../config/db');

const Aluno = {
  criar: async (dados) => {
    console.log('Dados recebidos:', dados);

    const valores = [
  dados.nome ?? null,
  dados.cpf ?? null,
  dados.rg ?? null,
  dados.nascimento ?? null,
  dados.certidao_nascimento ?? null,
  dados.nis ?? null,
  dados.bolsa_familia ?? null,
  dados.alergias ?? null,
  dados.deficiencia ?? null,
  dados.sexo ?? null,
  dados.cor_raca ?? null,
  dados.nacionalidade ?? null,
  dados.naturalidade ?? null,
  dados.endereco ?? null,
  dados.telefone ?? null,
  dados.nome_social ?? null,
  dados.nome_afetivo ?? null,
  dados.filiacao_pai ?? null,
  dados.filiacao_mae ?? null
];


    if (valores.length !== 19) {
      throw new Error(`Número incorreto de valores: esperado 20, recebido ${valores.length}`);
    }

  const sql = `
  INSERT INTO alunos (
    nome, cpf, rg, nascimento, certidao_nascimento, nis, bolsa_familia,
    alergias, deficiencia, sexo, cor_raca, nacionalidade, naturalidade,
    endereco, telefone, nome_social, nome_afetivo, filiacao_pai, filiacao_mae
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;


    const [resultado] = await db.query(sql, valores);
    return resultado;
  },

  listarTodos: async () => {
    const [resultados] = await db.query('SELECT * FROM alunos');
    return resultados;
  },

  buscarPorId: async (id) => {
    const [resultado] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);
    return resultado;
  },

  atualizar: async (id, dados) => {
    const campos = [
      'nome', 'cpf', 'rg', 'nascimento', 'certidao_nascimento', 'nis', 'bolsa_familia',
      'alergias', 'deficiencia', 'sexo', 'cor_raca', 'nacionalidade', 'naturalidade',
      'endereco', 'telefone', 'nome_social', 'nome_afetivo', 'filiacao_pai', 'filiacao_mae'
    ];

    const valores = campos.map(campo => dados[campo] ?? null);
    valores.push(id); // para o WHERE

    const sql = `
      UPDATE alunos SET
        nome = ?, cpf = ?, rg = ?, nascimento = ?, certidao_nascimento = ?, nis = ?, bolsa_familia = ?,
        alergias = ?, deficiencia = ?, sexo = ?, cor_raca = ?, nacionalidade = ?, naturalidade = ?,
        endereco = ?, telefone = ?, nome_social = ?, nome_afetivo = ?, filiacao_pai = ?, filiacao_mae = ?
      WHERE id = ?
    `;

    const [resultado] = await db.query(sql, valores);
    return resultado;
  },

  deletar: async (id) => {
    const [resultado] = await db.query('DELETE FROM alunos WHERE id = ?', [id]);
    return resultado;
  }
};

module.exports = Aluno;
