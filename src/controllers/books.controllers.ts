const { bookService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')

class BookController {
  constructor() {}

  async getBooks(req: any, res: any) {
    try {
      const response = await bookService.getBooksSerivce()

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
