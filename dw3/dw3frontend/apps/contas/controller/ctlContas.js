// ctlContas.js - Frontend Controller para Contas

const axios = require("axios");
const moment = require("moment");

// =======================================================================
// @ Função principal - Manutenção de Contas
// =======================================================================
const manutContas = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllContas", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      res.render("contas/view/vwManutContas.njk", {
        title: "Manutenção de Contas",
        data: resp.data.registro,
        erro: null,
        userName: userName,
      });
    } catch (error) {
      let remoteMSG = "";
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível";
      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";
      } else {
        remoteMSG = error.message;
      }

      res.render("contas/view/vwManutContas.njk", {
        title: "Manutenção de Contas",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    }
  })();

// =======================================================================
// @ Função de Inserção de Contas
// =======================================================================
const insertContas = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      try {
        // Buscar clientes disponíveis
        const clientes = await axios.get(
          process.env.SERVIDOR_DW3Back + "/getAllClientes",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );

        return res.render("contas/view/vwFCrContas.njk", {
          title: "Cadastro de Contas",
          data: null,
          erro: null,
          clientes: clientes.data.registro,
          userName: req.session.userName,
        });
      } catch (error) {
        console.error("[ctlContas|insertContas-GET] Erro ao buscar clientes:", error.message);
        return res.render("contas/view/vwFCrContas.njk", {
          title: "Cadastro de Contas",
          data: null,
          erro: "Erro ao buscar clientes",
          clientes: [],
          userName: req.session.userName,
        });
      }

    } else {
      // POST
      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertContas", regData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          timeout: 5000,
        });

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error("[ctlContas|insertContas] Erro ao inserir conta:", error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: null,
          erro: null,
        });
      }
    }
  })();

// =======================================================================
// @ Função de Visualização de Contas
// =======================================================================
const ViewContas = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      const id = req.params.id;
      const oper = req.params.oper;

      const response = await axios.post(
        process.env.SERVIDOR_DW3Back + "/getContaByID",
        { contaid: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.status === "ok") {
        const clientes = await axios.get(
          process.env.SERVIDOR_DW3Back + "/getAllClientes",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );

        response.data.registro[0].dtavencimento = moment(response.data.registro[0].dtavencimento).format("YYYY-MM-DD");
        response.data.registro[0].dtarecebimento = moment(response.data.registro[0].dtarecebimento).format("YYYY-MM-DD");

        res.render("contas/view/vwFRUDrContas.njk", {
          title: "Visualização de Conta",
          data: response.data.registro[0],
          disabled: true,
          clientes: clientes.data.registro,
          userName: userName,
        });
      } else {
        console.log("[ctlContas|ViewContas] Conta não localizada!");
        res.json({ status: "Conta não localizada!" });
      }
    } catch (error) {
      console.error("[ctlContas|ViewContas] Erro ao buscar conta:", error.message);
      res.json({ status: "Erro ao buscar conta!" });
    }
  })();

// =======================================================================
// @ Função de Atualização de Contas
// =======================================================================
const UpdateContas = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      if (req.method == "GET") {
        const id = req.params.id;

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getContaByID",
          { contaid: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.status === "ok") {
          const clientes = await axios.get(
            process.env.SERVIDOR_DW3Back + "/getAllClientes",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          );

          response.data.registro[0].dtavencimento = moment(response.data.registro[0].dtavencimento).format("YYYY-MM-DD");
          response.data.registro[0].dtarecebimento = moment(response.data.registro[0].dtarecebimento).format("YYYY-MM-DD");

          res.render("contas/view/vwFRUDrContas.njk", {
            title: "Atualização de Conta",
            data: response.data.registro[0],
            disabled: false,
            clientes: clientes.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlContas|UpdateContas] Conta não localizada!");
        }
      } else {
        const regData = req.body;

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/updateContas",
          regData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            timeout: 5000,
          }
        );

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      }
    } catch (error) {
      console.error("[ctlContas|UpdateContas] Erro ao atualizar conta:", error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();

// =======================================================================
// @ Função de Exclusão de Contas
// =======================================================================
const DeleteContas = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(
        process.env.SERVIDOR_DW3Back + "/deleteContas",
        regData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          timeout: 5000,
        }
      );

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error("[ctlContas|DeleteContas] Erro ao deletar conta:", error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();


// =======================================================================
// @ Exportação dos módulos
// =======================================================================
module.exports = {
  manutContas,
  insertContas,
  ViewContas,
  UpdateContas,
  DeleteContas
};
