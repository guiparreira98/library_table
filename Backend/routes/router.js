const express = require("express");
const app = express();
const bibliotecaRouter = require("./routes/bibliotecas"); // Caminho para o seu router

app.use(express.json()); // Para analisar o corpo das requisições como JSON
app.use('/api', bibliotecaRouter); // Usando o router

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});
