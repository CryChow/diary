const EssayModel = require('../model/essay')

/**
 * 操作文章collection类
 */
class Essay {
  static insert (params) {
    return new Promise((resolve, reject) => {
      // todo 添加验证
      if (!params) {
        reject(0)
      }
      const essayDoc = new EssayModel(params)
      essayDoc
        .save()
        .then(essay => {
          resolve(essay)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  static async search (params) {
    const { skip, limit } = params
    const essays = await EssayModel
      .find(null, null, {
        skip,
        limit,
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