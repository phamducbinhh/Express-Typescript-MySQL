const { categoryService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')

class CategoryController {
  constructor() {}

  async getCategories(req: any, res: any) {
    try {
      const response = await categoryService.getCategoriesSerivce()

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }
  async getCategoryDetail(req: any, res: any) {
    try {
      const response = await categoryService.getCategoryDetailService(req.params.id)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }
}

module.exports = new CategoryController()
