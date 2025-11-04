const mdlContas = require("../model/mdlContas");

const getAllContas = (req, res) =>
  (async () => {
    let registro = await mdlContas.getAllContas();
    res.json({ status: "ok", registro: registro });
  })();

const getContaByID = (req, res) =>
  (async () => {
    const contaID = parseInt(req.body.contaid);
    let registro = await mdlContas.getContaByID(contaID);
    res.json({ status: "ok", registro: registro });
  })();
  
const getContaByIDGeral = (req, res) =>
  (async () => {
    const contaID = parseInt(req.body.contaid);
    let registro = await mdlContas.getContaByIDGeral(contaID);
    res.json({ status: "ok", registro: registro });
})();

const insertContas = (request, res) =>
  (async () => {
    try {
      const contaREG = request.body;
      let { msg, linhasAfetadas } = await mdlContas.insertContas(contaREG);
      let status = msg === "ok" ? "ok" : "erro";
      res.json({ status: status, msg: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      console.error(
        "[ctlContas|insertContas] Erro inesperado: ",
        error.message
      );
      res.json({
        status: "erro",
        msg: "Erro fatal no controlador: " + error.message,
        linhasAfetadas: -1,
      });
    }
  })();


const updateContas = (request, res) =>
  (async () => {
    try {
      const contaREG = request.body;
      let { msg, linhasAfetadas } = await mdlContas.UpdateContas(contaREG);
      let status = msg === "ok" ? "ok" : "erro";
      res.json({ status: status, msg: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      console.error(
        "[ctlContas|updateContas] Erro inesperado: ",
        error.message
      );
      res.json({
        status: "erro",
        msg: "Erro fatal no controlador: " + error.message,
        linhasAfetadas: -1,
      });
    }
  })();

const DeleteContas = (request, res) =>
  (async () => {
    try {
      const contaREG = request.body;
      let { msg, linhasAfetadas } = await mdlContas.DeleteContas(contaREG);

      let status = msg === "ok" ? "ok" : "erro";
      res.json({ status: status, msg: msg, linhasAfetadas: linhasAfetadas });
    } catch (error) {
      console.error(
        "[ctlContas|DeleteContas] Erro inesperado: ",
        error.message
      );
      res.json({
        status: "erro",
        msg: "Erro fatal no controlador: " + error.message,
        linhasAfetadas: -1,
      });
    }
  })();

module.exports = {
  getAllContas,
  getContaByID,
  getContaByIDGeral,
  insertContas,
  updateContas,
  DeleteContas,
};
