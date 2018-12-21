const Router = require('koa-router')
const Essay = require('../controller/essay')

const essay = new Essay()
const essayRouter = new Router()

essayRouter.get('/add', async (ctx) => {
  const {
    title,
    body,
    author,
    tags,
    password,
  } = ctx.query
  const data = await essay.insert({
    title,
    body,
    author,
    tags,
    password,
  })
  ctx.body = {
    errno: 0,
    message: 'success',
    data,
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
    pageNo,
    pageSize,
    count,
  }
  ctx.sendSucess({
    list,
    pagination,
  }, '查询成功')
})
module.exports = essayRouter
