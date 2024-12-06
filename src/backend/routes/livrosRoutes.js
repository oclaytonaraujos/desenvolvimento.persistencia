const express = require('express');
const Livro = require('../models/Livro');
const router = express.Router();
const gerarPDF = require('../utils/pdfGenerator');  // Corrija o caminho se necessário

// Criar um novo livro
router.post('/', async (req, res) => {
  const { titulo, autor, genero, ano_publicacao } = req.body;

  if (!titulo || !autor) {
    return res.status(400).send('Título e autor são obrigatórios.');
  }

  try {
    const newLivro = await Livro.create({
      titulo,
      autor,
      genero,
      ano_publicacao,
    });

    res.status(201).json(newLivro);
  } catch (error) {
    console.error('Erro ao criar livro:', error.message);
    res.status(500).send('Erro ao criar livro.');
  }
});

// Buscar todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.status(200).json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error.message);
    res.status(500).send('Erro ao buscar livros.');
  }
});

// Buscar um livro pelo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).send('Livro não encontrado.');
    }
    res.status(200).json(livro);
  } catch (error) {
    console.error('Erro ao buscar livro:', error.message);
    res.status(500).send('Erro ao buscar livro.');
  }
});

// Atualizar um livro pelo ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, genero, ano_publicacao } = req.body;

  try {
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).send('Livro não encontrado.');
    }

    livro.titulo = titulo || livro.titulo;
    livro.autor = autor || livro.autor;
    livro.genero = genero || livro.genero;
    livro.ano_publicacao = ano_publicacao || livro.ano_publicacao;

    await livro.save();
    res.status(200).json(livro);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error.message);
    res.status(500).send('Erro ao atualizar livro.');
  }
});

// Deletar um livro pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).send('Livro não encontrado.');
    }

    await livro.destroy();
    res.status(204).send('Livro deletado com sucesso.');
  } catch (error) {
    console.error('Erro ao deletar livro:', error.message);
    res.status(500).send('Erro ao deletar livro.');
  }
});

router.get('/pdf', async (req, res) => {
  try {
    // Buscar todos os livros
    const livros = await Livro.findAll();
    
    // Buscar todas as resenhas
    const resenhas = await Resenha.find();  // MongoDB busca todas as resenhas
    
    // Gerar o PDF
    gerarPDF(livros, resenhas);

    res.status(200).send('PDF gerado com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error.message);
    res.status(500).send('Erro ao gerar PDF.');
  }
});

module.exports = router;
