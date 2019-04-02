'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let clientSchema = new Schema({
  name: String,
  clientId: String,
  clientSecret: String,
  sessionId: String,
  limit: {
    type: Number,
    default: 5
  },
  count: {
    type: Number,
    default: 0
  },
})

module.exports = mongoose.model('Client', clientSchema)
