const Router = require('koa-router')
const router = new Router()

const essay = require('./essay')

router.get('/welcome', async function (ctx) {
  ctx.body = 'this a users response!'
})

router.use('/essay', essay.routes())

module.exports = router
