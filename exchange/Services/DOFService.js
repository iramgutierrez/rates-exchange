'use strict'

const rp = require('request-promise')
const cheerio = require('cheerio')

/**
 * Get rate for Diario Oficial de la Federación using Web Scraping
 */
let sync = async provider => {
  let DOMResponse = await rp(provider.url).catch(_ => false)
  const $ = cheerio.load(DOMResponse)

  let rate = parseFloat($('tr.renglonTituloColumnas').next().children().eq(3).text())

  return {
    provider: provider.name,
    value: rate,
    last_updated: new Date()
  }
}

module.exports = {sync}