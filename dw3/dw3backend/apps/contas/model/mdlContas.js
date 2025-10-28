const db = require("../../../database/databaseconfig");

const getAllContas = async () => {
  return (
    await db.query(
      "SELECT *,(SELECT descricao from CONTAS where contaid = clientes.contaid)" +
      "FROM clientes where deleted = false ORDER BY nomeRazaoSocial ASC"
    )
  ).rows;
};

const getContaByID = async (contaIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CONTAS where contaid = clientes.contaid)" +
      "FROM clientes WHERE clienteid = $1 and deleted = false ORDER BY contas.dataVencimento ASC",
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
        "INSERT INTO contas " + "values(default, $1, $2, $3, $4, $5)",
        [
          contaREGPar.valor,
          contaREGPar.dtaVencimento,
          contaREGPar.dtaRecebimento,
          contaREGPar.descricao,
          contaREGPar.ativo,
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
        "ativo = $6 " +
        "clienteid = $7",
        "WHERE contaid = $1",
        [
          contaREGPar.valor,
          contaREGPar.dtaVencimento,
          contaREGPar.dtaRecebimento,
          contaREGPar.descricao,
          contaREGPar.ativo,
          contaREGPar.clienteid,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlContas|insertContas] " + error.detail;
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
        "UPDATE contas SET " + "deleted = true " + "WHERE contaid = $1",
        [contaREGPar.contaid]
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
