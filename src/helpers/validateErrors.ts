const { body } = require('express-validator')

const validateEmail = body('email').isEmail().withMessage('Email không hợp lệ')
const validatePassword = body('password').isLength({ min: 5 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự')

const validateRegister = [validateEmail, validatePassword]
const validateLogin = [validateEmail, validatePassword]

const validateCreateBook = [
  body('title').notEmpty().withMessage('Title is required.').isString().withMessage('Title must be a string.'),
  body('price').notEmpty().withMessage('Price is required.').isNumeric().withMessage('Price must be a number.'),
  body('available')
    .notEmpty()
    .withMessage('available is required.')
    .isNumeric()
    .withMessage('available must be a number.'),
  body('image').optional().isURL().withMessage('Image must be a valid URL.'), // Kiểm tra image là URL (nếu có)
  body('description').optional().isString().withMessage('Description must be a string.'), // Kiểm tra description là chuỗi (nếu có)
  body('categoryId').optional().isNumeric().withMessage('Category ID must be a number.') // Kiểm tra categoryId là số (nếu có)
]

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateBook
}
