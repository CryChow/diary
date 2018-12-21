const mongoose = require('./connect')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  color: String,
}, { collection: 'user' })

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
