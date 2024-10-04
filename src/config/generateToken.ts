const jwt = require('jsonwebtoken')

const generateToken = ({ id, email, role_code }: { id: string; email: string; role_code: string }) => {
  return jwt.sign({ id, email, role_code }, process.env.JWT_EXPIRES_IN, {
    expiresIn: process.env.JWT_EXPIRES_IN || '2d'
  })
}

module.exports = generateToken
