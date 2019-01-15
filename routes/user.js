const Router = require('koa-router')
const User = require('../controllers/user')

const userRouter = new Router()

userRouter.get('/add', async (ctx) => {
  const {
    name,
    nickname,
    password,
    color,
  } = ctx.query
  if (!name || !nickname || !password) {
    ctx.sendError(1, '必传参数不能为空！', 400)
  } else {
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
  }
})

userRouter.get('/search', async (ctx) => {
  ctx.sendSucess(null, 'unfinished')
})
module.exports = userRouter
