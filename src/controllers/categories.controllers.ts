const { categoryService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')

class CategoryController {
  constructor() {}

  async getCategories(req: any, res: any) {
    try {
      const response = await categoryService.getCategoriesSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }
  async getCategoryDetail(req: any, res: any) {
    try {
      const response = await categoryService.getCategoryDetailService(req.params.id)

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }
}

module.exports = new CategoryController()
