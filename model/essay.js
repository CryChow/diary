const mongoose = require('./connect')
const Schema = mongoose.Schema

const EssaySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: String,
  tags: String,
  password: String,
}, { collection: 'essay' })

const EssayModel = mongoose.model('Essay', EssaySchema)

module.exports = EssayModel

