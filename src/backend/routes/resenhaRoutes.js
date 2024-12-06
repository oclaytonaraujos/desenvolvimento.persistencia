// src/backend/routes/resenhaRoutes.js
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const router = express.Router();
const uri = process.env.MONGO_URI; // A URI do MongoDB, que pode ser no MongoDB Atlas ou no local

// Verifica se a URI foi definida no arquivo .env
if (!uri) {
  console.error("MONGODB_URI não está definida!");
  process.exit(1); // Encerra o processo caso a URI não esteja definida
}

const client = new MongoClient(uri);

// Criar uma nova resenha
router.post('/', async (req, res) => {
  const { livro_id, titulo_resenha, resenha, autor_resenha } = req.body;

  // Verificar se todos os campos obrigatórios estão presentes
  if (!livro_id || !titulo_resenha ||!resenha || !autor_resenha) {
    return res.status(400).send('Livro, resenha e autor são obrigatórios.');
  }

  try {
    // Conectar ao MongoDB
    await client.connect();

    // Selecionar o banco de dados e a coleção
    const database = client.db("GerenciamentoLivros");
    const collection = database.collection("resenha");

    // Definir o documento a ser inserido
    const documento = {
      livro_id,
      titulo_resenha,
      resenha,
      autor_resenha,
      data_resenha: new Date(),  // Data atual da resenha
    };

    // Inserir o documento
    const resultado = await collection.insertOne(documento);
    console.log(`Documento inserido com o ID: ${resultado.insertedId}`);

    // Retornar o ID da resenha inserida
    res.status(201).json({ id: resultado.insertedId });
  } catch (error) {
    console.error('Erro ao criar resenha:', error.message);
    res.status(500).send('Erro ao criar resenha.');
  } finally {
    await client.close(); // Fechar a conexão após a operação
  }
});

// Buscar todas as resenhas de um livro
router.get('/:livro_id', async (req, res) => {
  const { livro_id } = req.params;

  try {
    // Converter o livro_id para número (se for o caso)
    const livroId = parseInt(livro_id);

    // Verificar se a conversão foi bem-sucedida
    if (isNaN(livroId)) {
      return res.status(400).send('O ID do livro deve ser um número válido.');
    }

    // Conectar ao MongoDB
    await client.connect();

    // Selecionar o banco de dados e a coleção
    const database = client.db("GerenciamentoLivros");
    const collection = database.collection("resenha");

    // Buscar as resenhas do livro
    const resenhas = await collection.find({ livro_id: livroId }).toArray();

    // Verificar se encontrou resenhas
    if (resenhas.length === 0) {
      return res.status(404).send('Nenhuma resenha encontrada para este livro.');
    }

    res.status(200).json(resenhas);
  } catch (error) {
    console.error('Erro ao buscar resenhas:', error.message);
    res.status(500).send('Erro ao buscar resenhas.');
  } finally {
    await client.close(); // Fechar a conexão após a operação
  }
});

module.exports = router;
