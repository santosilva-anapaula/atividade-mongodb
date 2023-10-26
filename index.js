const express = require("express");

const connectToDatabase = require("./database/database");

const authService = require("./service/auth.service");

const jwt = require("jsonwebtoken");

const app = express();

const usuario = require("./router/usuario.router");

connectToDatabase();

const port = 3000;
const segredo = "63fg8t45asp";// Segredo usado para assinar tokens JWT

app.use(express.json());

app.use("/usuario", usuario);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/login", async (req, res) => {    
    try {
        const { email, senha } = req.body; //Desconstrução de objeto - separar as informações
        const user = await authService.loginService(email);// Chama função de serviço para autenticação

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado, tente novamente"});
        }

        if (senha != user.senha) {
            return res.status(400).send({ message: "Senha invalida"});
        }

        const token = authService.generateToken(user, segredo);// Gera um token JWT válido

        res.status(200).send({
            user,
            token
        });
    } catch (err) {
        console.log(`err: ${err}`);//mostra no console caso ocorra erro
    }    
});

app.get("/teste-token", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: "O token não foi informado!"});
    }

    const parts = authHeader.split(" ");// Divide o cabeçalho de autorização para obter o token

    if (parts.length !== 2) {
        return res.status(401).send({ message: "Token inválido!"});
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ message: "Token mal formatado!"});
    }

    jwt.verify(token, segredo, (err, decoded) => {
        if (err) {
            console.log(`Erro: ${err}`);
            return res.status(500).send({ message: "Erro interno, tente novamente"});
        }
        console.log(decoded);
        res.send(decoded);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});