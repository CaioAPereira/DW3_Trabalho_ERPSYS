const db = require("../../../database/databaseconfig");

const GetAllClientes = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM clientes where removido = false ORDER BY nomeRazaoSocial ASC"
    )
  ).rows;
};

const GetClienteByID = async (clienteIDPar) => {
  return ( 
    await db.query(
      "SELECT * " +
      "FROM clientes WHERE clienteid = $1 and removido = false ORDER BY nomeRazaoSocial ASC",
      [clienteIDPar]      
    )
  ).rows;
};

const InsertClientes = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO clientes (Removido, NomeRazaoSocial, CPF_CNPJ, Email) " + "values(default, $1, $2, $3)",
        [
          registroPar.nomeRazaoSocial,
          registroPar.cpf_cnpj,
          registroPar.email,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|insertClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE clientes SET " +
        "cpf_cnpj = $2, " +
        "nomeRazaoSocial = $3, " +
        "email = $4, " +
        "removido = $5 " +
        "WHERE clienteid = $1",
        [
          registroPar.clienteid,
          registroPar.cpf_cnpj,
          registroPar.nomeRazaoSocial,
          registroPar.email,
          registroPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|UpdateClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeleteClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE clientes SET " + "removido = true " + "WHERE clienteid = $1",
        [registroPar.clienteid]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|DeleteClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


module.exports = {
  GetAllClientes,
  GetClienteByID,
  InsertClientes,
  UpdateClientes,
  DeleteClientes,
};
