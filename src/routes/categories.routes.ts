const express = require('express')

const verifyToken = require('../middleware/verifyToken')

const verifyRole = require('../middleware/verifyRole')

const { categoryController } = require('../controllers')

const router = express.Router()

router.get('/', [verifyToken, verifyRole(['R1'])], categoryController.getCategories)

module.exports = router
