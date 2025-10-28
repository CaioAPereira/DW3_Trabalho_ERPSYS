var express = require('express');
var router = express.Router();
// Importa o controller de Clientes
var clientesApp = require("../apps/clientes/controller/ctlClientes") 

//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
// Troca 'Alunos' por 'Clientes' nas rotas e funções
router.get('/ManutClientes', authenticationMiddleware, clientesApp.manutClientes)
router.get('/InsertClientes', authenticationMiddleware, clientesApp.insertClientes);
router.get('/ViewClientes/:id', authenticationMiddleware, clientesApp.ViewClientes);
router.get('/UpdateClientes/:id', authenticationMiddleware, clientesApp.UpdateCliente); // (singular no controller)

/* POST métodos */
// Troca 'Alunos' por 'Clientes' nas rotas e funções
router.post('/InsertClientes', authenticationMiddleware, clientesApp.insertClientes);
router.post('/UpdateClientes', authenticationMiddleware, clientesApp.UpdateCliente); // (singular no controller)
router.post('/DeleteClientes', authenticationMiddleware, clientesApp.DeleteCliente); // (singular no controller)
// router.post('/viewClientes', authenticationMiddleware, clientesApp.viewClientes);

module.exports = router;