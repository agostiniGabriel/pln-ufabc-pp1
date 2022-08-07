const addressUpdate = require("./addressUpdateController");
const addUser = require("./addUserController.js");

const controllers = {
  "atualizar.endereco-yes": addressUpdate,
  "cadastrar.usuario-yes":addUser
};

module.exports = controllers;
