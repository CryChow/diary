const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true })

mongoose.connection.on('error', function (error) {
  console.log('failed')
})
mongoose.connection.on('open', function (e) {
  console.log('success')
})
mongoose.connection.on('disconnected', function () {
  console.log('closed')
})
module.exports = mongoose
