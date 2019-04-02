'use strict'

const entity = require('../Entities/rateEntity')
const providers = require('../providers.json')
const services = require('../Services')

/**
 * rateEntity
 * Services
 * 
 */
class ClientRepository {
  constructor (entity, services) {
    this.Entity = entity
    this.services = services
  }
  
  static get injectable () { return true }

  static get inject () {
    return [
      entity,
      services
    ]
  }

  /**
   * Update all rates by available providers
   */
  async sync () {
    return providers
      .filter(provider => `${provider.id}Service` in this.services)
      .map(await this.syncOne.bind(this)) 
  }

  /**
   * Update rate by provider given
   */
  async syncOne(provider) {
    let service = this.services[`${provider.id}Service`]
    return await service.sync(provider)
  }
}

module.exports = ClientRepository