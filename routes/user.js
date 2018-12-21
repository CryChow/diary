const Router = require('koa-router')
const User = require('../controller/user')

const userRouter = new Router()

userRouter.get('/add', async (ctx) => {
  const {
    name,
    nickname,
    password,
    color,
  } = ctx.query
  const data = await User.insert({
    name,
    nickname,
    password,
    color,
  })
  ctx.sendSucess(data, '添加用户成功')
})

userRouter.get('/search', async (ctx) => {

  ctx.sendSucess(null, 'unfinished')
})
module.exports = userRouter
