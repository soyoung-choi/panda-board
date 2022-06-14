'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
      })
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING(100),
      },
      contents: {
        type: DataTypes.STRING(500),
      },
      image: {
        type: DataTypes.BLOB('long'),
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      underscored: true,
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  )
  return Post
}
