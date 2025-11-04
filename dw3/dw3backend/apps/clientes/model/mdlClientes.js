const db = require("../../../database/databaseconfig");

const GetAllClientes = async () => {
  return (
    await db.query(
      "SELECT * FROM clientes where removido = false ORDER BY nomerazaosocial ASC"
    )
  ).rows;
};

const GetClienteByID = async (clienteIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM clientes WHERE clienteid = $1 and removido = false ORDER BY nomerazaosocial ASC",
      [clienteIDPar]
    )
  ).rows;
};

const InsertClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    const nome = registroPar.nomerazaosocial || null;
    const cpf = registroPar.cpf_cnpj || null;

    linhasAfetadas = (
      await db.query(
        "INSERT INTO clientes (removido, nomerazaosocial, cpf_cnpj, email) " +
          "values(default, $1, $2, $3)",
        [
          nome,
          cpf,
          registroPar.email,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|insertClientes] " + error.message;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    const nome = registroPar.nomerazaosocial || null;
    const cpf = registroPar.cpf_cnpj || null;

    linhasAfetadas = (
      await db.query(
        "UPDATE clientes SET " +
          "cpf_cnpj = $2, " +
          "nomerazaosocial = $3, " +
          "email = $4, " +
          "removido = $5 " +
          "WHERE clienteid = $1",
        [
          registroPar.clienteid,
          cpf,
          nome,
          registroPar.email,
          registroPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|UpdateClientes] " + error.message;
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
    msg = "[mdlClientes|DeleteClientes] " + error.message;
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
