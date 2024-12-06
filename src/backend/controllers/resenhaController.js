const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI; // A URI do MongoDB, que pode ser no MongoDB Atlas ou no local
const client = new MongoClient(uri);

// Função para inserir a resenha
async function inserirResenha(req, res) {
  const { livro_id, titulo_resenha, resenha, autor_resenha } = req.body;

  // Verificar se todos os campos obrigatórios estão presentes
  if (!livro_id || !titulo_resenha || !resenha || !autor_resenha) {
    return res.status(400).send('Livro, resenha e autor são obrigatórios.');
  }

  // Log para verificar os dados recebidos
  console.log('Dados recebidos:', req.body); // Verifique no terminal o que está sendo recebido

  try {
    // Conectar ao MongoDB
    await client.connect();

    // Selecionar o banco de dados e a coleção
    const database = client.db("GerenciamentoLivros");
    const collection = database.collection("resenha");

    // Substituir quebras de linha \n por <br /> para formatação em HTML
    const resenhaFormatted = resenha.replace(/\n/g, '<br />'); // Substitui quebras de linha por <br /> no texto

    // Definir o documento a ser inserido
    const documento = {
      livro_id,
      titulo_resenha,  // Confirmando que o título está sendo adicionado ao documento
      resenha: resenhaFormatted, // Armazenar a resenha formatada com <br />
      autor_resenha,
      data_resenha: new Date(),  // Data atual da resenha
    };

    // Inserir o documento
    const resultado = await collection.insertOne(documento);
    console.log(`Documento inserido com o ID: ${resultado.insertedId}`);

    // Resposta com o ID da resenha inserida
    res.status(201).json({ id: resultado.insertedId });
  } catch (error) {
    console.error('Erro ao inserir resenha:', error);
    res.status(500).send('Erro ao inserir resenha.');
  } finally {
    await client.close(); // Fechar a conexão após a operação
  }
}

module.exports = { inserirResenha };
