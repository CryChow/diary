const Essay = require('../model/essay')
const user = require('./essay')

module.exports =  (router) => {
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
  user(router)
}
