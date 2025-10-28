const db = require("../../../database/databaseconfig");

const getAllContas = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT nomeRazaoSocial from CLIENTES where clienteid = contas.clienteid)" +
        "FROM contas WHERE removido = false ORDER BY nomeRazaoSocial ASC",
    )
  ).rows;
};

const getContaByID = async (contaIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT nomeRazaoSocial from CLIENTES where clienteid = contas.clienteid)" +
        "FROM contas WHERE contasid = $1 and removido = false ORDER BY nomeRazaoSocial ASC",
      [contaIDPar]
    )
  ).rows;
};

const insertContas = async (contaREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO contas (removido, valor, dtaVencimento, dtaRecebimento, descricao, clienteid) " + "values(default, $1, $2, $3, $4, $5)",
        [
          contaREGPar.valor,
          contaREGPar.dtaVencimento,
          contaREGPar.dtaRecebimento,
          contaREGPar.descricao,
          contaREGPar.clienteid
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlContas|insertContas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateContas = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE contas SET " +
        "valor = $2, " +
        "dtaVencimento = $3, " +
        "dtaRecebimento= $4, " +
        "descricao = $5, " +
        "removido = $6, " +
        "clienteid = $7 " +
        "WHERE contasid = $1",
        [
          contaREGPar.contasid,
          contaREGPar.valor,
          contaREGPar.dtaVencimento,
          contaREGPar.dtaRecebimento,
          contaREGPar.descricao,
          contaREGPar.removido,
          contaREGPar.clienteid,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlContas|updateContas] " + error.detail;
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
    msg = "[mdlContas|insertContas] " + error.detail;
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
