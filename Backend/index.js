const express = require("express");
const cors = require("cors");
const routes = require("./routes/bibliotecas"); // Caminho para o seu router
const { db } = require("./db/conn"); // Conexão com Firestore

const app = express();
const PORT = 8000; // Definindo a porta como uma constante

// Configuração de Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite comunicação via JSON

// Configuração de Rotas
app.use('/api', routes); // Base para as rotas da aplicação

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor Online na porta ${PORT}`);
});