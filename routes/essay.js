const Router = require('koa-router')
const essay = new Router()

essay.get('/', async function (ctx, next) {
  ctx.body = 'this a users response!'
})

module.exports = essay
