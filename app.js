const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const views = require('koa-views')
// const co = require('co')
// const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const formidable = require('koa2-formidable')
const koaBody = require('koa-body')
const logger = require('koa-logger')
// const debug = require('debug')('koa2:server')
const path = require('path')

const errorhandle = require('./middlewares/error-handle')
const sendhandle = require('./middlewares/send-handle')

const config = require('./config')
const router = require('./routes')

const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app
  // .use(koaBody({
  //   multipart: true,
  // }))
  .use(formidable())
  .use(bodyparser({
    jsonLimit: '2048kb', // 控制body的parse转换大小 default 1mb
    formLimit: '512kb',  //  控制你post的大小  default 56kb
  }))
  .use(json())
  .use(errorhandle)
  .use(sendhandle())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { 'njk': 'nunjucks' },
    extension: 'njk',
  }))
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/diary/*', async function(ctx, next) {
  const html = fs.readFileSync(path.resolve('./public/index.html'))
  ctx.type = 'html'
  ctx.body = html
})
router.get('/', async (ctx, next) => {
  ctx.state = {
    title: 'Cry\'s blog',
  }
  await ctx.render('index', ctx.state)
})

app.on('error', function (err) {
  console.log('error:', err)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
