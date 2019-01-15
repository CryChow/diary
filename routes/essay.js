const Router = require('koa-router')
const Essay = require('../controllers/essay')

const essayRouter = new Router()

essayRouter.get('/add', async (ctx) => {
  const {
    title,
    body,
    author,
    tags,
    password,
    type,
  } = ctx.query
  if (!title || !body || !author) {
    ctx.sendError(1, '必传参数不能为空！', 400)
  } else {
    const data = await Essay.insert({
      title,
      body,
      author,
      tags,
      password,
      type,
    })
    ctx.sendSucess(data, '添加文章成功')
  }
})

essayRouter.get('/search', async (ctx) => {
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
    pageSize: pageSize || 10,
    count,
  }
  ctx.sendSucess({
    list,
    pagination,
  }, '查询成功')
})
module.exports = essayRouter
