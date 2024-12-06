const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');

const Login = sequelize.define('Login', {
  idLogin: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
}, {
  tableName: 'logins',
  timestamps: true,
});

module.exports = Login;
