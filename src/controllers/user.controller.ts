const { userService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')

class UserController {
  constructor() {}

  async getUserById(req: any, res: any) {
    const { id } = req.params
    try {
      const response = await userService.getUserById({ id })

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }
}

module.exports = new UserController()
