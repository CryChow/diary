const Router = require('koa-router')
const router = new Router()

const Essay = require('../model/essay')
const essay = require('./essay')


router.get('/welcome', async function (ctx, next) {
  const essay = new Essay({
    title: 'test title',
    body: 'test body',
    author: 'CryChow',
    tags: 'test,one,two',
  })
  essay.insert()
    .then(res => {
      console.log(res)
    })
  ctx.body = 'this a users response!'
})
router.use('/essay', essay.routes())
module.exports = router
