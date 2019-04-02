'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let rateSchema = new Schema({
  provider: String,
  value: Number,
  last_updated: Date
})

module.exports = mongoose.model('Rate', rateSchema)
