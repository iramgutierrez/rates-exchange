'use strict'

const entity = require('../Entities/rateEntity')
const providers = require('../providers.json')

/**
 * rateEntity
 */
class ClientRepository {
  constructor (entity, providers) {
    this.Entity = entity
    this.providers = providers
  }
  
  static get injectable () { return true }

  static get inject () {
    return [
      entity,
      providers
    ]
  }

  /**
   * Retrive latest rates saved by provider
   */
  async latest () {
    return this.providers.map(async provider => {
      return await this.Entity.findOne({provider: provider.name}, null , {sort: { last_updated: -1}})
    }) 
  }

  /**
   * Save many rates by provider
   */
  async saveMany (rates) {
    return this.Entity.insertMany(rates)
  }
}

module.exports = ClientRepository