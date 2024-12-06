require('dotenv').config(); // Garante que as variáveis do .env sejam carregadas
const { Sequelize } = require('sequelize');

// Configurar a conexão com o banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // 'mysql' no caso
    port: process.env.DB_PORT,      // Porta do banco de dados
    logging: false,                 // Desabilita logs do Sequelize (opcional)
});

// Testar a conexão
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
    }
}

testConnection();

const mongoose = require('mongoose');

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error.message));


module.exports = sequelize;
