
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  nick: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('messages', message)
