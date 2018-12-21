const UserModel = require('../model/user')
/**
 * 操作用户collection类
 */
class User {
  static insert (params) {
    return new Promise((resolve, reject) => {
      // todo 添加验证
      if (!params) {
        reject(0)
      }
      const userDoc = new UserModel(params)
      userDoc
        .save()
        .then(user => {
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  static async search (params) {
    const user = UserModel.findOne(params)
    return new Promise((resolve => {
      resolve(user)
    }))
  }
}

module.exports = User
