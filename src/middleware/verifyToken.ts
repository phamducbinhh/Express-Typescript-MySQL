const jwt = require('jsonwebtoken')
const HttpStatusCode = require('../constants/HttpStatusCode')

const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.cookies?.token ? req.cookies?.token : req.headers?.authorization?.split(' ')[1]

  if (!token) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: 'Missing access token'
    })
  }
  try {
    jwt.verify(token, process.env.JWT_EXPIRES_IN, (err: any, decoded: any) => {
      if (err) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: 'Access token expired'
        })
      }
      req.user = decoded
      next()
    })
  } catch (error: any) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message
    })
  }
}

module.exports = verifyToken
