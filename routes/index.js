const Router = require('koa-router')
const router = new Router()

const essay = require('./essay')

router.use('/essay', essay.routes())

module.exports = router
