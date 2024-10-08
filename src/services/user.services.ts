const db = require('../models')

class UserService {
  constructor() {}

  async getUserById({ id }: { id: string }) {
    try {
      const response = await db.User.findOne({
        where: { id },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'role_code']
        },
        include: [
          {
            model: db.Role,
            as: 'role',
            attributes: ['id', 'code', 'value']
          }
        ]
      })

      return {
        success: response ? true : false,
        message: response ? 'OK' : 'Người dùng không tìm thấy',
        data: response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  async getCurrentUser(id: string) {
    try {
      const response = await db.User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email', 'avatar', 'role_code']
      })

      return {
        success: response ? true : false,
        message: response ? 'OK' : 'người dùng không tồn tại',
        data: response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  async updateCurrentUser(id: string, body: any) {
    const { name, avatar } = body
    try {
      const user = await db.User.findOne({
        where: { id }
      })

      user.name = name || user.name
      user.avatar = avatar || user.avatar

      await user.save()

      return {
        success: user ? true : false,
        message: user ? 'OK' : 'người dùng không tồn tại',
        data: user
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new UserService()
