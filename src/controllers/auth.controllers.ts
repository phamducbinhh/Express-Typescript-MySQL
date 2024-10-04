const { authService } = require('../services')
const { validationResult } = require('express-validator')
const HttpStatusCode = require('../constants/HttpStatusCode')

class AuthController {
  constructor() {}

  async register(req: any, res: any) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array()[0].msg })
    }
    try {
      const response = await authService.register(req.body)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }

  async login(req: any, res: any) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array()[0].msg })
    }
    try {
      const response = await authService.login(req.body)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        err: -1,
        msg: error.message
      })
    }
  }
}

module.exports = new AuthController()
