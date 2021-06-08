module.exports = mongoose => {
    const Funcionario = mongoose.model(
      "funcionario",
      mongoose.Schema(
        {
          matricula: String,
          nome: String,
          email: String,
          dataDeCadastro: String
        },
        { timestamps: true }
      )
    );
  
    return Funcionario;
  };