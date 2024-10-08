'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // Một Book thuộc về một Category
      Book.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.FLOAT,
      available: DataTypes.INTEGER,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Book'
    }
  )
  return Book
}
