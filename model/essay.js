const mongoose = require('./connect')
const Schema = mongoose.Schema

const EssaySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: String,
  tags: String,
  password: String,
}, { collection: 'essay' })

const EssayModel = mongoose.model('Essay', EssaySchema)

/**
 * 文章数据库操作封装
 * @param {Object} doc
 * @param {String} doc.title 标题
 * @param {String} doc.body 内容主体
 * @param {String} doc.author 作者
 * @param {String} doc.tags 标签 ex: 'tag1,tag2,tag3'
 * @param {String} doc.password 加密文章储存此字段
 * @constructor
 */
function Essay(doc) {
  this.doc = doc
}

Essay.prototype.insert = params => {
  return new Promise((resolve, reject) => {
    // todo 添加验证
    if (!params) {
      reject(0)
    }
    const essay = new EssayModel(params)
    essay
      .save()
      .then(essay => {
        resolve(essay)
      })
      .catch(err => {
        reject(err)
      })
  })
}

Essay.prototype.find = async params => {
  const { skip, limit } = params
  const essays = await EssayModel
    .find(null, null, {
      skip,
      limit,
    })
  const count = await EssayModel.count()
  return new Promise((resolve) => {
    resolve({
      list: essays,
      count,
    })
  })
}
module.exports = Essay
