const bcrypt = require('bcrypt')
const db = require('../models')
const generateToken = require('../config/generateToken')

class AuthService {
  constructor() {}

  hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
  }

  async register({ email, password }: { email: string; password: string }, res: any) {
    try {
      const [user, created] = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: this.hashPassword(password)
        }
      })

      if (!created) {
        throw new Error('Email đã tồn tại trong hệ thống')
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role_code: user.role_code
      })

      // Lưu token vào cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2 * 24 * 60 * 60 * 1000
      })

      return {
        success: true,
        message: 'Đăng ký thành công',
        token: token || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  async login({ email, password }: { email: string; password: string }, res: any) {
    try {
      const user = await db.User.findOne({
        where: { email }
      })

      if (!user) {
        throw new Error('Email không tồn tại trong hệ thống')
      }

      const isPasswordValid = this.comparePassword(password, user.password)

      if (!isPasswordValid) {
        throw new Error('Mật khẩu không chính xác')
      }
      const token = generateToken({
        id: user.id,
        email: user.email,
        role_code: user.role_code
      })

      // Lưu token vào cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2 * 24 * 60 * 60 * 1000
      })

      return {
        success: true,
        message: 'Đăng nhập thành công',
        token: token || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new AuthService()
