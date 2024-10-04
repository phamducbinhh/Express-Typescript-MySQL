'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // Định nghĩa mối quan hệ giữa User và Role
      User.belongsTo(models.Role, {
        // Khóa ngoại trong bảng User tham chiếu đến bảng Role
        foreignKey: 'role_code', // Cột role_code trong bảng User
        targetKey: 'code', // Cột code trong bảng Role sẽ được tham chiếu
        as: 'role' // Tên alias cho mối quan hệ này
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role_code: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
