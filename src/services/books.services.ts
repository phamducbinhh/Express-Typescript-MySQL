const db = require('../models')

class BookService {
  constructor() {}

  async getBooksSerivce(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 5)
    const offset = (page - 1) * limit
    const search = req.query.search || ''
    try {
      const { rows, count } = await db.Book.findAndCountAll({
        where: {
          title: {
            [db.Sequelize.Op.like]: `%${search}%`
          }
        },
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

  async createBookSerivce(body: any) {
    try {
      const [book, created] = await db.Book.findOrCreate({
        where: { title: body.title },
        defaults: body
      })

      if (!created) {
        throw new Error('Book already exists.')
      }

      return {
        err: 0,
        msg: 'Book created successfully.',
        book: book
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new BookService()
