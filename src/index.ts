const express = require('express')
const { connectDatabase } = require('./config/connectDatabase')
const cors = require('cors')
const app = express()
const initRoutes = require('./routes')
require('dotenv').config()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PUT', 'DELETE']
  })
)
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

initRoutes(app)

const startServer = async () => {
  try {
    await connectDatabase()

    app.listen(process.env.PORT, () => {
      console.log(`App server listening on port: ${process.env.PORT || 4000}`)
    })
  } catch (err: any) {
    console.error('App server error:', err.stack)
  }
}

startServer()
