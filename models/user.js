const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    senha: DataTypes.STRING,
    cargo: {
      type: DataTypes.ENUM('direcao', 'secretaria')
    },
    resetToken: DataTypes.STRING,
    resetTokenExpira: DataTypes.DATE
  }, {
    tableName: 'usuarios',
    hooks: {
      beforeCreate: async (user) => {
        if (user.senha) {
          user.senha = await bcrypt.hash(user.senha, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('senha')) {
          user.senha = await bcrypt.hash(user.senha, 10);
        }
      }
    }
  });

  return User;
};