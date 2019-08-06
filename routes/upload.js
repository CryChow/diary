// const Router = require('koa-router')
// const upyun = require('upyun')
// const service = new upyun.Service('images-cry', 'crychow', '87yasxzdnr825')
// const client = new upyun.Client(service)
// // module.exports = client
// // const client = require('../utils/upyun')
// const serverURL = 'http://v0.api.upyun.com/images-cry/blog/'
//
// const uploadRouter = new Router()
// uploadRouter.post('/file', async (ctx) => {
//   const { file } = ctx.request.body
//   console.log(file, 'dd')
//   const url = `${serverURL}${file.name || 'noname.img'}`
//   try {
//     const res = await client.putFile(url, file)
//   }
//   catch (e) {
//     console.log(e)
//   }
//   if (res) {
//     const data = {
//       url: 'test',
//     }
//     ctx.sendSucess(data, '上传成功')
//   } else {
//     ctx.sendError(1, '上传失败！', 500)
//   }
// })
const Router = require('koa-router')
const request = require('request')
const fs = require('fs')
const uploadRouter = new Router()

const url = 'https://sm.ms/api/upload'

uploadRouter.post('/file', async (ctx) => {
  const { files } = ctx.request
  const file = fs.createReadStream(files.smfile.path)
  console.log('ffffffffffffff', files.smfile)
  const formData = {
    smfile: file,
  }
  request.post({ url, formData }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // console.log(response)
    }
    ctx.sendSucess(response, '上传成功')

  })
})
module.exports = uploadRouter
