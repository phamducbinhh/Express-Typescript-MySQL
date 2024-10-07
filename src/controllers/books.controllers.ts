const { bookService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const { validationResult } = require('express-validator')

class BookController {
  constructor() {}

  async getBooks(req: any, res: any) {
    try {
      const response = await bookService.getBooksSerivce(req)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }

  async createBook(req: any, res: any) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array()[0].msg })
    }
    try {
      const response = await bookService.createBookSerivce(req.body)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }
  async deleteBook(req: any, res: any) {
    try {
      const response = await bookService.deleteBookSerivce(req.params.id)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }
  async updateBook(req: any, res: any) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array()[0].msg })
    }
    try {
      const response = await bookService.updateBookService(req.params.id, req.body)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }
}

module.exports = new BookController()
