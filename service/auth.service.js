const Usuario = require("../model/usuario");

const jwt = require("jsonwebtoken");

const loginService = (email) => Usuario.findOne({ email });//Função de serviço para autenticação do usuário com base no email fornecido.

const generateToken = (user, segredo) => jwt.sign({user}, segredo);//Função para gerar um token JWT válido usando as informações do usuário e um segredo.

module.exports = { 
    loginService,
    generateToken
};