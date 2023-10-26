const usuarioService = require("../service/usuario.service");

const mongoose = require("mongoose");

const find= async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        let found = false;

        const usuario = await usuarioService.findByIdUsuario(id);

        if (usuario != null) {
            found = true
        }

        if (!found) {
            return res.status(404).send({message: "Usuário não foi encontrada, tente outro ID"});
        }

        return res.status(200).send(usuario);

    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send("Erro no servidor tente novamente mais tarde");        
    }
}

const findAllUsuarios = async (req, res) => {
    return res.status(200).send(await usuarioService.findAllUsuario());
}

const createUsuario = async (req, res) => {
    const usuario = req.body;

    if (Object.keys(usuario).length === 0) {
        return res.status(400).send({message: "O corpo da mensagem está vazio"});
    }

    if (!usuario.nome) {
        return res.status(400).send({message: "O campo 'nome' não foi encontrado"})
    }

    if (!usuario.email) {
        return res.status(400).send({message: "O campo 'email' não foi encontrado"});
    }

    if (!usuario.senha) {
        return res.status(400).send({message: "O campo 'senha' não foi encontrado"});
    }

    return res.status(201).send(await usuarioService.createUsuario(usuario));
}

const updateUsuario = async (req, res) => {
    const id = req.params.id;
    const usuario = req.body;

    if (Object.keys(usuario).length === 0) {
        return res.status(400).send({message: "O corpo da mensagem está vazio"});
    }

    if (!usuario.nome) {
        return res.status(400).send({message: "O campo 'nome' não foi encontrado"})
    }

    if (!usuario.email) {
        return res.status(400).send({message: "O campo 'email' não foi encontrado"});
    }

    if (!usuario.senha) {
        return res.status(400).send({message: "O campo 'senha' não foi encontrado"});
    }

    // if (!found) {
    //     res.status(404).send({message: "Não foi encontrado"});
    // }

    return res.status(200).send(await usuarioService.updateUsuario(id, usuario));
}

const deleteUsuario = async (req, res) => {
    const id = req.params.id;

    return res.status(200).send(await usuarioService.deleteUsuario(id));
}

module.exports = {
    find,
    findAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}