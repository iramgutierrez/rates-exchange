'use strict'

const rp = require('request-promise')
const parser = require('xml2json')

/**
 * Get rate for Banxico using HTTP Request with XML Response
 */
let sync = async provider => {
  let options = {
    uri: provider.url,
    headers: {
      Accept: 'application/xml'
    }
  }
  let XMLResponse = await rp(options).catch(_ => false)
  let stringResponse = parser.toJson(XMLResponse)
  let response = JSON.parse(stringResponse)
 
  let serie = response.series.serie
  
  return {
    provider: provider.name,
    value: response.series.serie.Obs.dato,
    last_updated: new Date()
  }
}

module.exports = {sync}