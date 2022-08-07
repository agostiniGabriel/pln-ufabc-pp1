const cepIntegration = require("busca-cep");
const sheetsIntegration = require("./sheetsController");

module.exports = async (req, res) => {
  const { docNumber, zipCode } = req.body.queryResult.parameters;

  cepIntegration(zipCode, { sync: false, timeout: 2000 })
    .then((address) => {
      return sheetsIntegration.updateAddress(address, docNumber);
    })
    .then((success) => {
      return res.json({
        fulfillmentText: "Endereço atualizado com sucesso 🪄😁",
      });
    })
    .catch((error) => {
      console.error(error);
      const statusCode = error.response.status;
      let message =
        statusCode === 404
          ? "Este número de documento não existe na base de dados 😱."
          : "Não foi possível atualizar seu endereço 😓";
      return res.json({
        fulfillmentText: message,
      });
    });
};
