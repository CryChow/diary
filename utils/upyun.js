const upyun = require('upyun')
const service = new upyun.Service('images-cry', 'crychow', '87yasxzdnr825')
const client = new upyun.Client(service)
module.exports = client
