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
}

module.exports = new CategoryService()
