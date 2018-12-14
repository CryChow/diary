const Router = require('koa-router')
const Essay = require('../model/essay')

const essayRouter = new Router()

essayRouter.get('/add', async function (ctx) {
  const {
    title,
    body,
    author,
    tags,
    password,
  } = ctx.query
  const essay = new Essay({
    title,
    body,
    author,
    tags,
    password,
  })
  essay.insert()
    .then(res => {
      console.log(res, 'success')
    })
  ctx.body = 'this a users response!'
})

module.exports = essayRouter
