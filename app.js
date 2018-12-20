const Koa = require('koa')
const app = new Koa()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const router = require('./routes')

const port = process.env.PORT || config.port

// error handler
onerror(app)
const errhandle = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.errno = e.errno || 500
    ctx.body = {
      code: e.code || 1,
      message: e.message || '未知错误',
      body: null,
    }
  }
}

// middlewares
app.use(bodyparser())
  .use(json())
  .use(errhandle)
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { 'njk': 'nunjucks' },
    extension: 'njk',
  }))
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/', async (ctx, next) => {
  ctx.state = {
    title: 'Koa2',
  }
  await ctx.render('index', ctx.state)
})

app.on('error', function (err) {
  console.log('error:', err)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
