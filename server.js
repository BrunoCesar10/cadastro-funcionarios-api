const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express")
swaggerDocument = require('./swagger.json');

const app = express();

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch(err => {
    console.log("Não foi possível conectar ao banco de dados!", err);
    process.exit();
  });

var corsOptions = {
    origin: "https://cadastro-funcionarios-api.herokuapp.com:8081"
  };

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Home da aplicação" });
  });

require("./app/routes/funcionario.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server funcionando na porta ${PORT}.`);
});