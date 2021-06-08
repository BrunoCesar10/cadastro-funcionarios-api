module.exports = app => {
    const funcionarios = require("../controllers/funcionario.controller.js");
  
    var router = require("express").Router();
  
    // Criar funcionário
    router.post("/", funcionarios.create);
  
    // Retornar todos os funcionários
    router.get("/", funcionarios.findAll);
 
    // Retornar todos os funcionários por matrícula
    router.get("/:matricula", funcionarios.findOne);
  
    // Atualiza dados de um funcionário por matrícula
    router.put("/:matricula", funcionarios.update);
  
    // Deleta funcionário por matrícula
    router.delete("/:matricula", funcionarios.delete);
  
    // Deleta todos os funcionários
    router.delete("/", funcionarios.deleteAll);
  
    app.use('/api/funcionarios', router);
  };