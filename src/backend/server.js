// src/backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Para servir arquivos estáticos

const loginRoutes = require('./routes/loginRoutes');
const livrosRoutes = require('./routes/livrosRoutes');
const resenhaRoutes = require("./routes/resenhaRoutes"); // Corrigido o caminho da rota de resenhas

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Endereço do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para parsing de dados de formulários (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta "uploads" (imagens dos produtos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/login', loginRoutes);
app.use('/api/livros', livrosRoutes);
app.use('/api/resenhas', resenhaRoutes); // Corrigido o caminho para '/api/resenhas'

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
