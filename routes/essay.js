const Router = require('koa-router')
const Essay = require('../controllers/essay')

const essayRouter = new Router()

essayRouter.post('/add', async (ctx) => {
  const {
    title,
    content,
    author,
    tags,
    password,
    type,
    mood,
  } = ctx.request.body
  if (!title || !content || !mood || !author) {
    ctx.sendError(1, '必传参数不能为空！', 400)
  } else {
    const data = await Essay.insert({
      title,
      body: content,
      author,
      tags,
      password,
      type,
      mood,
    })
    ctx.sendSucess(data, '添加文章成功')
  }
})

essayRouter.get('/list', async (ctx) => {
  let { pageNo, pageSize } = ctx.query
  pageNo = parseInt(pageNo, 10)
  pageSize = parseInt(pageSize, 10)
  const limit = pageSize || 10
  const skip = pageNo ? limit * (pageNo - 1) : 0

  const { list, count } = await Essay.search({
    skip,
    limit,
  })
  const pagination = {
    pageNo: pageNo || 1,
    pageSize: limit,
    pageCount: Math.ceil(count / pageSize),
    count,
  }
  ctx.sendSucess({
    list,
    pagination,
  }, '查询成功')
})

essayRouter.get('/item', async ctx => {
  const { id } = ctx.query
  const data = await Essay.searchOne({ _id: id })
  ctx.sendSucess(data, '查询成功')
})
module.exports = essayRouter
