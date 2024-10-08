const { userService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')

class UserController {
  constructor() {}

  async getUserById(req: any, res: any) {
    const { id } = req.params
    try {
      const response = await userService.getUserById({ id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }
  async getCurrent(req: any, res: any) {
    const { id } = req.user
    try {
      const response = await userService.getCurrentUser(id)

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }
  async updateCurrent(req: any, res: any) {
    const { id } = req.user
    try {
      const response = await userService.updateCurrentUser(id)

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

module.exports = new UserController()
