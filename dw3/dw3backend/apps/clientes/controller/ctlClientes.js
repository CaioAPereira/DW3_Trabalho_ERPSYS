const mdlClientes = require("../model/mdlClientes");

const GetAllClientes = (req, res) =>
  (async () => {
    // Esta função estava correta
    let registro = await mdlClientes.GetAllClientes();
    res.json({ status: "ok", registro: registro });
  })();

const GetClienteByID = (req, res) =>
  (async () => {
    // Esta função estava correta
    const clienteID = parseInt(req.body.clienteid);
    let registro = await mdlClientes.GetClienteByID(clienteID);
    res.json({ status: "ok", registro: registro });
  })();

// =======================================================================
// @ Função de Inserção (CORRIGIDA)
// =======================================================================
const InsertClientes = (request, res) =>
  (async () => {
    try {
      const registro = request.body;
      let { msg, linhasAfetadas } = await mdlClientes.InsertClientes(registro);

      // ### CORREÇÃO DA RESPOSTA JSON ###
      let status = (msg === "ok") ? "ok" : "erro";
      res.json({ "status": status, "msg": msg, "linhasAfetadas": linhasAfetadas });

    } catch (error) {
      res.json({
        "status": "erro",
        "msg": "[ctlClientes] Erro inesperado: " + error.message,
        "linhasAfetadas": -1
      });
    }
  })();

// =======================================================================
// @ Função de Atualização (CORRIGIDA)
// =======================================================================
// Nome da função (singular) para bater com as rotas
const UpdateCliente = (request, res) =>
  (async () => {
    try {
      const registro = request.body; // Chama a função do Model (que usa Plural)
      let { msg, linhasAfetadas } = await mdlClientes.UpdateClientes(registro); // ### CORREÇÃO ### // Define o status com base na msg e envia o JSON no formato correto

      let status = msg === "ok" ? "ok" : "erro";
      res.json({ status: status, msg: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      console.error(
        "[ctlClientes|UpdateCliente] Erro inesperado: ",
        error.message
      );
      res.json({
        status: "erro",
        msg: "Erro fatal no controlador: " + error.message,
        linhasAfetadas: -1,
      });
    }
  })();

// =======================================================================
// @ Função de Exclusão (CORRIGIDA)
// =======================================================================
// Nome da função (singular) para bater com as rotas
const DeleteCliente = (request, res) =>
  (async () => {
    try {
      const registro = request.body; // Chama a função do Model (que usa Plural)
      let { msg, linhasAfetadas } = await mdlClientes.DeleteClientes(registro); // ### CORREÇÃO ### // Define o status com base na msg e envia o JSON no formato correto

      let status = msg === "ok" ? "ok" : "erro";
      res.json({ status: status, msg: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      console.error(
        "[ctlClientes|DeleteCliente] Erro inesperado: ",
        error.message
      );
      res.json({
        status: "erro",
        msg: "Erro fatal no controlador: " + error.message,
        linhasAfetadas: -1,
      });
    }
  })();

// =======================================================================
// @ Exportação (CORRIGIDA)
// =======================================================================
module.exports = {
  GetAllClientes,
  GetClienteByID,
  InsertClientes,
  UpdateCliente, // <-- Singular, para bater com as rotas (rtClientes.js)
  DeleteCliente, // <-- Singular, para bater com as rotas (rtClientes.js)
};
