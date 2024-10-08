const HttpStatusCode = require('../constants/HttpStatusCode')

const verifyRole = (code: string[]) => {
  return (req: any, res: any, next: any) => {
    const userRole = req.user?.role_code || req.body?.role_code

    if (!userRole) {
      return res.status(HttpStatusCode.FORBIDEN).json({
        success: false,
        message: 'Access denied, no role provided'
      })
    }

    if (!code.includes(userRole)) {
      return res.status(HttpStatusCode.FORBIDEN).json({
        success: false,
        message: 'Access denied, insufficient permissions'
      })
    }

    next()
  }
}

module.exports = verifyRole
