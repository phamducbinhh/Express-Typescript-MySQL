const { insertService } = require('../services')

class InsertController {
  constructor() {}

  async insert(req: any, res: any) {
    try {
      const response = await insertService.insertData()
      return res?.status(200).json(response)
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: 'Fail at auth controller: ' + error
      })
    }
  }
}

module.exports = new InsertController()
