const mongoose = require('mongoose')
mongoose.connect('mongodb://crychow.cn:27017/blog', { useNewUrlParser: true })

mongoose.connection.on('error', function (error) {
  console.log('failed and error is:\n', error)
})
mongoose.connection.on('open', function () {
  console.log('success')
})
mongoose.connection.on('disconnected', function () {
  console.log('closed')
})
module.exports = mongoose
