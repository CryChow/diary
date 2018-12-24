const EssayModel = require('../model/essay')

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
    const { skip, limit } = params
    const essays = await EssayModel
      .find(null, null, {
        skip,
        limit,
      })
      .sort({
        date: 1,
      })
    const count = await EssayModel.countDocuments()
    return new Promise((resolve) => {
      resolve({
        list: essays,
        count,
      })
    })
  }
}

module.exports = Essay
