const mdlClientes = require("../model/mdlClientes");

const GetAllClientes = (req, res) =>
  (async () => {
    let registro = await mdlClientes.GetAllClientes();
    res.json({ status: "ok", registro: registro });
  })();

const GetClienteByID = (req, res) =>
  (async () => {
    const clienteID = parseInt(req.body.clienteid);
    let registro = await mdlClientes.GetClienteByID(clienteID);

    res.json({ status: "ok", registro: registro });
  })();

const InsertClientes = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlClientes.InsertClientes(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateClientes = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlClientes.UpdateClientes(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteClientes = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlClientes.DeleteClientes(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
module.exports = {
  GetAllClientes,
  GetClienteByID,
  InsertClientes,
  UpdateClientes,
  DeleteClientes
};
