const express = require('express')

const verifyToken = require('../middleware/verifyToken')

const { validateRegister, validateLogin } = require('../helpers/validateErrors')

const { authController } = require('../controllers')

const router = express.Router()

router.post('/register', validateRegister, authController.register)

router.post('/login', validateLogin, authController.login)

router.post('/logout', verifyToken, authController.logout)

module.exports = router
