const axios = require("axios");
const sheetDBEndpoint = "https://sheetdb.io/api/v1/cbimze9ug4fr4";

const sheetsModule = {};

sheetsModule.updateAddress = (newAddress, docNumber) => {
  const { cep, logradouro, bairro, localidade, uf } = newAddress;
  return axios.patch(`${sheetDBEndpoint}/DocNumber/${docNumber}`, {
    data: {
      ZipCode: cep,
      Address: logradouro,
      Neighborhood: bairro,
      City: localidade,
      State: uf,
    },
  });
};

sheetsModule.parseUserPayload = (payload) => {
  const { docNumber, name, zipCode, logradouro, bairro, localidade, uf } = payload;
  const parsed = {
    DocNumber: docNumber,
    Name: name,
    ZipCode: zipCode,
    Address: logradouro,
    Neighborhood: bairro,
    City: localidade,
    State: uf
  };
  return parsed;
};

sheetsModule.createUser = (userObj) => {
  return axios.post(`${sheetDBEndpoint}`, {
    data: sheetsModule.parseUserPayload(userObj),
  });
};

module.exports = sheetsModule;
