const Router = require('koa-router')
const Essay = require('../model/essay')

const essayDoc = new Essay()
const essayRouter = new Router()

essayRouter.get('/add', async (ctx) => {
  const {
    title,
    body,
    author,
    tags,
    password,
  } = ctx.query
  const data = await essayDoc.insert({
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

essayRouter.get('/search', async ctx => {
  const list = await essayDoc.find()
  ctx.body = {
    errno: 0,
    message: 'success',
    data: {
      list,
    },
  }
})
module.exports = essayRouter
