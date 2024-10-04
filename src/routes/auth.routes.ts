const express = require('express')

const { validateRegister, validateLogin } = require('../helpers/validateErrors')

const { authController } = require('../controllers')

const router = express.Router()

router.post('/register', validateRegister, authController.register)

router.post('/login', validateLogin, authController.login)

module.exports = router
