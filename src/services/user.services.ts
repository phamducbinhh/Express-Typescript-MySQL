const db = require('../models')

class UserService {
  constructor() {}

  async getUserById({ id }: { id: string }) {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ['password']
        }
      })

      return {
        err: response ? 0 : 1,
        msg: response ? 'OK' : 'Người dùng không tìm thấy',
        response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new UserService()
