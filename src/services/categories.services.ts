const db = require('../models')

class CategoryService {
  constructor() {}

  async getCategoriesSerivce() {
    try {
      const response = await db.Category.findAll({
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'OK' : 'Failed to get categories.',
        response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  async getCategoryDetailService(id: number | string) {
    try {
      const response = await db.Category.findOne({
        where: { id },
        include: [
          {
            model: db.Book,
            as: 'books',
            attributes: ['id', 'title', 'price', 'available', 'image', 'description']
          }
        ],
        attributes: ['id', 'title', 'description']
      })

      if (!response) {
        return {
          success: false,
          message: 'Category not found.'
        }
      }

      return {
        success: true,
        message: 'OK',
        response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new CategoryService()
