const db = require('../models')

class BookService {
  constructor() {}

  async getBooksSerivce() {
    try {
      const response = await db.Book.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'categoryId']
        },
        include: [
          {
            model: db.Category,
            as: 'category',
            attributes: ['id', 'title', 'description']
          }
        ]
      })

      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Failed to get books.',
        response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new BookService()
