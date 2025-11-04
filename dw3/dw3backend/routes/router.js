const express = require("express");
const routerApp = express.Router();

const appContas = require("../apps/contas/controller/ctlContas");
const appClientes = require("../apps/clientes/controller/ctlClientes");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de contas
routerApp.get("/getAllContas", appLogin.AutenticaJWT, appContas.getAllContas);
routerApp.post("/getContaByID", appLogin.AutenticaJWT, appContas.getContaByID);
routerApp.post("/getContaByIDGeral", appLogin.AutenticaJWT, appContas.getContaByIDGeral);
routerApp.post("/insertContas", appLogin.AutenticaJWT, appContas.insertContas);
routerApp.post("/updateContas", appLogin.AutenticaJWT, appContas.updateContas);
routerApp.post("/DeleteContas", appLogin.AutenticaJWT, appContas.DeleteContas);

//Rotas de Clientes
routerApp.get("/GetAllClientes", appLogin.AutenticaJWT, appClientes.GetAllClientes);
routerApp.post("/GetClienteByID", appLogin.AutenticaJWT, appClientes.GetClienteByID);
routerApp.post("/InsertClientes", appLogin.AutenticaJWT, appClientes.InsertClientes);
routerApp.post("/UpdateClientes", appLogin.AutenticaJWT, appClientes.UpdateCliente);
routerApp.post("/DeleteClientes", appLogin.AutenticaJWT, appClientes.DeleteCliente);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
