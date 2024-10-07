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
        message: response ? 'OK' : 'Lấy thông tin người dùng thành công',
        data: response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new UserService()
