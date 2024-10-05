const db = require('../models')

class BookService {
  constructor() {}

  async getBooksSerivce() {
    try {
      const response = await db.Book.findAll({
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

module.exports = new BookService()
