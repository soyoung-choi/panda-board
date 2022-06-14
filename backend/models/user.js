'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post)
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100), // 해쉬화하면 길어지기 떄문에 100글자
        allowNull: true, // 카카오 로그인은 비번 필요없으니
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      sns_id: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      timestamps: true,
      paranoid: true, // 삭제일(복구용)
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  )
  return User
}
