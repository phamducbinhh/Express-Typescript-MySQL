const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const insertRouter = require('./insert.routes')

const initRoutes = (app: any): void => {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/user', userRouter)
  app.use('/api/v1/insert', insertRouter)
}

module.exports = initRoutes
