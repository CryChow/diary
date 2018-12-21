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
  const user = await User.search({
    nickname,
  })
  if (user) {
    ctx.sendError(2, '昵称已存在')
  } else {
    const data = await User.insert({
      name,
      nickname,
      password,
      color,
    })
    ctx.sendSucess(data, '添加用户成功')
  }
})

userRouter.get('/search', async (ctx) => {
  ctx.sendSucess(null, 'unfinished')
})
module.exports = userRouter
