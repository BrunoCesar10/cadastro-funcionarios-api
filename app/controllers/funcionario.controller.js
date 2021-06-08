const db = require("../models");
const Funcionario = db.funcionarios;


// Criar funcionário
exports.create = (req, res) => {
    // Valida a requisição
    if (!req.body.matricula) {
      res.status(400).send({ message: "Matrícula não pode estar vazia" });
      return;
    }
  
    // Cria funcionário
    const funcionario = new Funcionario({
      matricula: req.body.matricula,
      nome: req.body.nome,
      email: req.body.email,
      dataDeCadastro: req.body.dataDeCadastro
    });
  
    // Guarda funcionário no banco de dados
    funcionario
      .save(funcionario)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao criar o funcionário."
        });
      });
};

// Buscar funcionários
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condicao = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {};
  
    Funcionario.find(condicao)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao buscar funcionário(s)"
        });
      });
};

// Buscar funcionário por matrícula
exports.findOne = (req, res) => {
    const matricula = req.params.matricula;
  
    Funcionario.findById(matricula)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Não foi encontrado funcionário com a matrícula " + matricula });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Ocorreu um erro ao buscar o funcionário com a matrícula " + matricula });
      });
};

// Atualizar dados de funcionário
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Dados a serem atualizados não podem estar vazios"
      });
    }
  
    const matricula = req.params.matricula;
  
    Funcionario.findByIdAndUpdate(matricula, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Não foi possível atualizar os dados do funcionário com matrícula ${matricula}. O funcionário não foi encontrado.`
          });
        } else res.send({ message: "Dados de funcionário atualizado com sucesso." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao atualizar dados do funcionário com matrícula " + matricula
        });
      });
};

// Deletar funcionário
exports.delete = (req, res) => {
    const matricula = req.params.matricula;
  
    Funcionario.findByIdAndRemove(matricula)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Não foi possível deletar o funcionário com matrícula ${matricula}. O funcionário não foi encontrado.`
          });
        } else {
          res.send({
            message: "Dados do funcionário deletados com sucesso"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Deletar todos
exports.deleteAll = (req, res) => {
    Funcionario.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} funcionários deletados com sucesso`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao deletar os funcionários"
        });
      });
  };