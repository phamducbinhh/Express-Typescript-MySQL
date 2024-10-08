'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // Một Category có thể có nhiều Book
      Category.hasMany(models.Book, { foreignKey: 'categoryId', as: 'books' })
    }
  }
  Category.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )
  return Category
}
