const EssayModel = require('../models/essay')

/**
 * 操作文章collection类
 */
class Essay {
  static insert(params) {
    return new Promise((resolve, reject) => {
      const essayDoc = new EssayModel(params)
      essayDoc
        .save()
        .then(essay => {
          resolve(essay)
        })
        .catch(err => {
          reject({
            message: err.message,
            code: 400,
            errno: 2,
          })
        })
    })
  }
  static async search(params) {
    const essays = await EssayModel
      .find(null, 'title author date _id mood', params)
      .sort({
        date: -1,
      })
    const count = await EssayModel.countDocuments()
    return new Promise((resolve) => {
      resolve({
        list: essays,
        count,
      })
    })
  }
  static async searchOne(params) {
    const essay = await EssayModel
      .findOne(params, null, null)
    return new Promise((resolve) => {
      resolve(essay)
    })
  }
}

module.exports = Essay
