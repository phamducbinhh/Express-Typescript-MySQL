const { body } = require('express-validator')

const validateEmail = body('email').isEmail().withMessage('Email không hợp lệ')
const validatePassword = body('password').isLength({ min: 5 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự')

const validateRegister = [validateEmail, validatePassword]
const validateLogin = [validateEmail, validatePassword]

module.exports = {
  validateRegister,
  validateLogin
}
