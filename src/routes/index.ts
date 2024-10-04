const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')

const initRoutes = (app: any): void => {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/user', userRouter)
}

module.exports = initRoutes
