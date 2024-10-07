const db = require('../models')

class CategoryService {
  constructor() {}

  async getCategoriesSerivce() {
    try {
      const response = await db.Category.findAll({
        raw: true
      })

      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get categories.',
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
          err: 1,
          msg: 'Category not found.'
        }
      }

      return {
        err: 0,
        msg: 'OK',
        response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new CategoryService()
