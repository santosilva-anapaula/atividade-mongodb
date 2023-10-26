const mongoose = require("mongoose");

//Define um esquema para o modelo de usuário no banco de dados.
const UsuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    senha: {type: String, required: true}
});

const Usuario = mongoose.model("usuarios", UsuarioSchema);//Cria um modelo de dados (Usuario) com base no esquema definido.

module.exports = Usuario;