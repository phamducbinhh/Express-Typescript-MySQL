const axios = require('axios')
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
        return {
          success: false,
          message: 'Email không tồn tại trong hệ thống',
          token: null
        }
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
        return {
          success: false,
          message: 'Email không tồn tại trong hệ thống'
        }
      }

      if (!user.password) {
        return {
          success: false,
          message: 'Người dùng đã đăng ký bằng Google/Facebook. Vui lòng đăng nhập bằng Google/Facebook.'
        }
      }

      const isPasswordValid = this.comparePassword(password, user.password)

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Mật khẩu không chính xác',
          token: null
        }
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

  async loginGoogleService(accessToken: string, res: any) {
    try {
      const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
      const response = await axios.get(url)
      const { email } = response.data

      const [user, created] = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          role_code: 'R1'
        }
      })

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
        message: created ? 'Đăng ký thành công' : 'Đăng nhập thành công',
        token: token || null
      }
    } catch (error: any) {
      console.error('Error:', error.response ? error.response.data : error.message)
      throw new Error(error.response ? error.response.data.error.message : error.message)
    }
  }
}

module.exports = new AuthService()
