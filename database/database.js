const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.connect('mongodb://127.0.0.1:27017/aulas', {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    }).then(() =>{
        console.log("MongoDB conectado!");
    }).catch((err) =>{
        return console.log(`Erro na coneção com o banco: ${err}`);
    });
}

module.exports = connectToDatabase;