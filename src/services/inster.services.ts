const db = require('../models')
const data = require('../../data/data.json')
const generateCode = require('../helpers/fn')
class InsertService {
  constructor() {}

  async insertData() {
    try {
      const categories = Object.keys(data)

      categories.forEach(async (item) => {
        await db.Category.create({
          code: generateCode(8),
          value: item
        })
      })

      return 'OK'
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new InsertService()
