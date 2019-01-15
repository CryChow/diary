const mongoose = require('./connect')
const Schema = mongoose.Schema

const EssaySchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: 'short', // short & long
  },
  author: String,
  tags: String,
  password: String,
}, { collection: 'essay' })

const EssayModel = mongoose.model('Essay', EssaySchema)

module.exports = EssayModel
