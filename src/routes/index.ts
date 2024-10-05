const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const bookRouter = require('./books.routes')
const categoriesRouter = require('./categories.routes')

const initRoutes = (app: any): void => {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/user', userRouter)
  app.use('/api/v1/category', categoriesRouter)
  app.use('/api/v1/books', bookRouter)
}

module.exports = initRoutes
