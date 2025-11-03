const db = require("../../../database/databaseconfig");

const getAllContas = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT nomerazaosocial from clientes where clienteid = contas.clienteid)" +
        "FROM contas WHERE removido = false ORDER BY contasid ASC"
    )
  ).rows;
};

const getContaByID = async (contaIDPar) => {
  return (
    await db.query(
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
    // TRATAMENTO DE DADOS:
    const valor = contaREGPar.valor || null; // ### CORREÇÃO: Ler 'datavencimento' (com 'a') ###
    const datavencimento = contaREGPar.datavencimento || null;
    const datarecebimento = contaREGPar.datarecebimento || null;
    const descricao = contaREGPar.descricao || null;
    const clienteid = contaREGPar.clienteid || null;

    linhasAfetadas = (
      await db.query(
        "INSERT INTO contas (removido, valor, datavencimento, datarecebimento, descricao, clienteid) " +
          "values(default, $1, $2, $3, $4, $5)", // ### CORREÇÃO: Passar a variável correta ###
        [valor, datavencimento, datarecebimento, descricao, clienteid]
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
    const dtarecebimento = contaREGPar.datarecebimento || null;
    const clienteid = contaREGPar.clienteid || null;
    linhasAfetadas = (
      await db.query(
        "UPDATE contas SET " +
          "valor = $2, " +
          "datavencimento = $3, " +
          "datarecebimento= $4, " +
          "descricao = $5, " +
          "removido = $6, " +
          "clienteid = $7 " +
          "WHERE contasid = $1",
        [
          // ### CORREÇÃO: Ler 'contasid' (com 's') ###
          contaREGPar.contasid,
          contaREGPar.valor, // ### CORREÇÃO: Ler 'datavencimento' (com 'a') ###
          contaREGPar.datavencimento,
          dtarecebimento,
          contaREGPar.descricao,
          contaREGPar.removido,
          clienteid,
        ]
      )
    ).rowCount;
  } catch (error) {
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
        "UPDATE contas SET " + "removido = true " + "WHERE contasid = $1", // ### CORREÇÃO: Ler 'contasid' (com 's') ###
        [contaREGPar.contasid]
      )
    ).rowCount;
  } catch (error) {
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
