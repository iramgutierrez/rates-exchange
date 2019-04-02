'use strict'

const entity = require('../Entities/clientEntity')

/**
 * clientEntity
 */
class ClientRepository {
  constructor (entity) {
    this.Entity = entity
  }
  
  static get injectable () { return true }

  static get inject () {
    return [
      entity
    ]
  }

  /**
   * Retrieve all clients
   */
  async all () { return await this.Entity.find() }

  /**
   * Find a client by id
   */
  async findById (id) { return await this.Entity.findById(id) }

  /**
   * Verify if exists a client with clientId and clientSecret given
   */
  async auth (credentials) { return await this.Entity.findOne(credentials) }
}

module.exports = ClientRepository