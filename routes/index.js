const Router = require('koa-router')
const router = new Router()

const essay = require('./essay')
const upload = require('./upload')

router.use('/essay', essay.routes())
router.use('/user', require('./user').routes())
router.use('/upload', upload.routes())

module.exports = router
