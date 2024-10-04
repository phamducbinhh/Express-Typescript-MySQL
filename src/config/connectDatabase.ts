const Sequelize = require('sequelize')
require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  timezone: '+07:00',
  logging: false
})

const connectDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = {
  connectDatabase
}
