'use strict'

var rp = require('request-promise')

/**
 * Get rate for Fixer using HTTP Request with JSON Response
 */
let sync = async provider => {
  let stringResponse = await rp(provider.url).catch(_ => false)
  let response = JSON.parse(stringResponse)

  return {
    provider: provider.name,
    value: response.rates.MXN,
    last_updated: new Date()
  }
}

module.exports = {sync}