const express = require('express');
const bcrypt = require('bcrypt');
const Login = require('../models/Login');
const router = express.Router();

// Registro de usuário
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).send('Usuário e senha são obrigatórios.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Login.create({
      username,
      password_hash: hashedPassword,
      role: role || 'user',
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send('Usuário já existe.');
    } else {
      res.status(500).send('Erro ao registrar usuário.');
    }
  }
});

// Login do usuário
router.post('/', async (req, res) => {
  console.log('Requisição recebida em /login:', req.body); // Log da requisição
  const { username, password } = req.body;

  try {
    const user = await Login.findOne({ where: { username } });
    console.log('Usuário encontrado:', user); // Log do resultado do banco

    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(401).send('Usuário ou senha inválidos.');
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    console.log('Senha válida:', validPassword); // Log da validação de senha

    if (!validPassword) {
      console.log('Senha incorreta');
      return res.status(401).send('Usuário ou senha inválidos.');
    }

    console.log('Login bem-sucedido');
    res.status(200).json({ message: 'Login bem-sucedido', role: user.role });
  } catch (error) {
    console.error('Erro no login:', error.message); // Log do erro
    res.status(500).send('Erro ao fazer login.');
  }
});

router.post('/login', (req, res) => {
  res.status(200).send('Rota de login funcionando.');
});


module.exports = router;
