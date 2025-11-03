// routes/rtContas.js

var express = require("express");
var router = express.Router();
var contasApp = require("../apps/contas/controller/ctlContas");

// Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
  // Verificar se existe uma sessão válida.
  isLogged = req.session.isLogged;

  if (!isLogged) {
    res.redirect("/Login");
  }
  next();
}

/* GET métodos */
router.get("/ManutContas", authenticationMiddleware, contasApp.manutContas);
router.get("/InsertContas", authenticationMiddleware, contasApp.insertContas);
router.get("/ViewContas/:id", authenticationMiddleware, contasApp.ViewContas);
router.get(
  "/UpdateContas/:id",
  authenticationMiddleware,
  contasApp.UpdateContas
);

/* POST métodos */
router.post("/InsertContas", authenticationMiddleware, contasApp.insertContas);
router.post("/UpdateContas", authenticationMiddleware, contasApp.UpdateContas);
router.post("/DeleteContas", authenticationMiddleware, contasApp.DeleteContas);

module.exports = router;

// routes/rtContas.js

var express = require("express");
var router = express.Router();
var contasApp = require("../apps/contas/controller/ctlContas");

// Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
  // Verificar se existe uma sessão válida.
  isLogged = req.session.isLogged;

  if (!isLogged) {
    res.redirect("/Login");
  }
  next();
}

/* GET métodos */
router.get("/ManutContas", authenticationMiddleware, contasApp.manutContas);
router.get("/InsertContas", authenticationMiddleware, contasApp.insertContas);
router.get("/ViewContas/:id", authenticationMiddleware, contasApp.ViewContas);
router.get(
  "/UpdateContas/:id",
  authenticationMiddleware,
  contasApp.UpdateContas
);

/* POST métodos */
router.post("/InsertContas", authenticationMiddleware, contasApp.insertContas);
router.post("/UpdateContas", authenticationMiddleware, contasApp.UpdateContas);
router.post("/DeleteContas", authenticationMiddleware, contasApp.DeleteContas);

module.exports = router;
