const db = require("../../../database/databaseconfig");

const getAllContas = async () => {
  return (
    await db.query(
      // CORRIGIDO: PostgreSQL usa nomes em minúsculo, a menos que sejam criados com ""
      "SELECT *, (SELECT nomerazaosocial from clientes where clienteid = contas.clienteid)" +
        "FROM contas WHERE removido = false ORDER BY contasid ASC"
    )
  ).rows;
};

const getContaByID = async (contaIDPar) => {
  return (
    await db.query(
      // CORRIGIDO: 'nomerazaosocial' minúsculo
      "SELECT *, (SELECT nomerazaosocial from clientes where clienteid = contas.clienteid)" +
        "FROM contas WHERE contasid = $1 and removido = false",
      [contaIDPar]
    )
  ).rows;
};

const insertContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // TRATAMENTO DE DADOS: Converte strings vazias ou nulos do frontend para 'null' do banco
    const valor = contaREGPar.valor || null;
    const dtavencimento = contaREGPar.dtavencimento || null;
    const dtarecebimento = contaREGPar.dtarecebimento || null;
    const descricao = contaREGPar.descricao || null;
    const clienteid = contaREGPar.clienteid || null;

    linhasAfetadas = (
      await db.query(
        // CORRIGIDO: Usei os nomes de colunas em minúsculo (como o PostgreSQL usa)
        "INSERT INTO contas (removido, valor, datavencimento, datarecebimento, descricao, clienteid) " +
          "values(default, $1, $2, $3, $4, $5)",
        [valor, dtavencimento, dtarecebimento, descricao, clienteid]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlContas|insertContas] " + error.message;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    // TRATAMENTO DE DADOS
    const dtarecebimento = contaREGPar.dtarecebimento || null;
    const clienteid = contaREGPar.clienteid || null;
    linhasAfetadas = (
      await db.query(
        // CORRIGIDO: Nomes de colunas em minúsculo
        "UPDATE contas SET " +
          "valor = $2, " +
          "datavencimento = $3, " +
          "datarecebimento= $4, " +
          "descricao = $5, " +
          "removido = $6, " +
          "clienteid = $7 " +
          "WHERE contasid = $1",
        [
          contaREGPar.contasid,
          contaREGPar.valor,
          contaREGPar.dtavencimento,
          dtarecebimento, // tratado
          contaREGPar.descricao,
          contaREGPar.removido,
          clienteid, // tratado
        ]
      )
    ).rowCount;
  } catch (error) {
    // CORRIGIDO: Usar .message
    msg = "[mdlContas|updateContas] " + error.message;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE contas SET " + "removido = true " + "WHERE contasid = $1",
        [contaREGPar.contasid]
      )
    ).rowCount;
  } catch (error) {
    // CORRIGIDO: Usar .message e nome da função
    msg = "[mdlContas|DeleteContas] " + error.message;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllContas,
  getContaByID,
  insertContas,
  UpdateContas,
  DeleteContas,
};
