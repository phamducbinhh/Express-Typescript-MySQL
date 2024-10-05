const db = require('../models')

class BookService {
  constructor() {}

  async getBooksSerivce(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 5)
    const offset = (page - 1) * limit
    try {
      const { rows, count } = await db.Book.findAndCountAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'categoryId']
        },
        include: [
          {
            model: db.Category,
            as: 'category',
            attributes: ['id', 'title', 'description']
          }
        ],
        limit,
        offset
      })

      return {
        err: rows ? 0 : 1,
        msg: rows ? 'OK' : 'Failed to get books.',
        metadata: {
          totalItems: count,
          itemsPerPage: limit,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          items: rows
        }
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new BookService()
