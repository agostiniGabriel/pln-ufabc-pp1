const cepIntegration = require("busca-cep");
const sheetsIntegration = require("./sheetsController");

module.exports = async (req, res) => {
  const { docNumber, zipCode, name } = req.body.queryResult.parameters;

  cepIntegration(zipCode, { sync: false, timeout: 2000 })
    .then((address) => {
      const { cep, logradouro, bairro, localidade, uf } = address;
      const userObj = {
        name,
        docNumber,
        zipCode,
        logradouro,
        bairro,
        localidade,
        uf
      }
      return sheetsIntegration.createUser(userObj);
    })
    .then((success) => {
      return res.json({
        fulfillmentText: "Usuário criado com sucesso 🪄😁",
      });
    })
    .catch((error) => {
      console.error(error);
      const statusCode = error.response.status;
      let message = "Não foi possível concluir seu cadastro 😓";
      return res.json({
        fulfillmentText: message,
      });
    });
};