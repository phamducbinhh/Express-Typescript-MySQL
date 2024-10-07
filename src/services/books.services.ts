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
        success: rows ? true : false,
        message: rows ? 'Get books successfully' : 'Failed to get books.',
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
        success: true,
        message: 'Book created successfully.',
        book: book
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteBookSerivce(id: number) {
    try {
      const response = await db.Book.destroy({
        where: { id: id }
      })

      return {
        success: response ? true : false,
        message: response ? 'Book deleted successfully.' : 'Book not found.'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateBookService(id: number, body: any) {
    try {
      const response = await db.Book.findOne({
        where: { id: id }
      })

      if (!response) {
        return {
          success: false,
          message: 'Book not found.'
        }
      }

      await db.Book.update(body, {
        where: { id: id }
      })

      return {
        success: true,
        message: 'Book updated successfully.'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new BookService()
