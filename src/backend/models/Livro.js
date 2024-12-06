const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');

const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ano_publicacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'livros',
  timestamps: false, // Sem timestamp de criação/atualização automáticos
});

module.exports = Livro;
