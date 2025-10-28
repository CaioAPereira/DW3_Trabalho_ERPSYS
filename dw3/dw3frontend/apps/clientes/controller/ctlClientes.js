const axios = require("axios");
// O 'moment' não é necessário aqui, pois a tabela clientes não tem datas para formatar

const manutClientes = async (req, res) =>
  (async () => {
    //@ Abre o formulário de manutenção de Clientes
    const userName = req.session.userName;
    const token = req.session.token;
    let remoteMSG = ""; // Variável para armazenar mensagens de erro

    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllClientes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Set JWT token in the header
      }
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível";
      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";
      } else {
        remoteMSG = error.message; // Usar error.message para uma mensagem mais clara
      }

      res.render("clientes/view/vwManutClientes.njk", {
        title: "Manutenção de Clientes",
        data: null,
        erro: remoteMSG, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }

    res.render("clientes/view/vwManutClientes.njk", {
      title: "Manutenção de Clientes",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertClientes = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      // Clientes não têm dependências (como Cursos), então apenas renderiza a view
      return res.render("clientes/view/vwFCrClientes.njk", {
        title: "Cadastro de Clientes",
        data: null,
        erro: null, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: req.session.userName, // Passando o userName
      });

    } else {
      //@ POST
      const regData = req.body;
      const token = req.session.token;

      try {
        // @ Enviando dados para o servidor Backend
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertClientes", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000, // @ 5 segundos de timeout
        });

        res.json({
          status: response.data.status,
          msg: response.data.msg, // Usar msg (ou status, dependendo do seu backend)
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('Erro ao inserir dados no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: null, // Alterado de response.data (que não existe no catch)
          erro: error.message,
        });
      }
    }
  })();

const ViewClientes = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getClienteByID",
          {
            clienteid: id, // Ajustado de alunoid para clienteid
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          // Não há formatação de data ou busca de cursos necessária
          res.render("clientes/view/vwFRUDrClientes.njk", {
            title: "Visualização de Cliente",
            data: response.data.registro[0],
            disabled: true, // Para bloquear os campos na visualização
            userName: userName,
          });
        } else {
          console.log("[ctlClientes|ViewClientes] ID de cliente não localizado!");
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlClientes.js|ViewClientes] Cliente não localizado!" });
      console.log(
        "[ctlClientes.js|viewClientes] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const UpdateCliente = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getClienteByID",
          {
            clienteid: id, // Ajustado de alunoid para clienteid
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          // Não há formatação de data ou busca de cursos necessária
          res.render("clientes/view/vwFRUDrClientes.njk", {
            title: "Atualização de dados de Cliente",
            data: response.data.registro[0],
            disabled: false, // Campos abertos para edição
            userName: userName,
          });
        } else {
          console.log("[ctlClientes|UpdateCliente] Dados não localizados");
        }
      } else {
        //@ POST
        const regData = req.body;
        const token = req.session.token;
        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateClientes", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000, // @ 5 segundos de timeout
          });

          res.json({
            status: response.data.status,
            msg: response.data.msg,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlClientes.js|UpdateCliente] Erro ao atualizar dados de clientes no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: null,
            erro: error.message,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlClientes.js|UpdateCliente] Cliente não localizado!" });
      console.log(
        "[ctlClientes.js|UpdateCliente] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const DeleteCliente = async (req, res) =>
  (async () => {
    //@ POST
    const regData = req.body;
    const token = req.session.token;

    try {
      // @ Enviando dados para o servidor Backend
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteClientes", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000, // @ 5 segundos de timeout
      });

      res.json({
        status: response.data.status,
        msg: response.data.msg,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlClientes.js|DeleteCliente] Erro ao deletar dados de clientes no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: error.message,
      });
    }
  })();

module.exports = {
  manutClientes,
  insertClientes,
  ViewClientes,
  UpdateCliente,
  DeleteCliente
};