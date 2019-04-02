'use strict'

const Repository = require('../Repositories/RateRepository')
const Manager = require('../Managers/RateManager')

/**
 * RateRepository
 * RateManager
 */
class ClientController {
  constructor (Repository, Manager) {
    this.Repository = Repository
    this.Manager = Manager
  }

  static get injectable () { return true }

  static get inject () {
    return [
      Repository,
      Manager
    ]
  }

  /**
   * Express callback to retrieve latest rates by provider
   */
  async check (req, res, next) {
    let rates = await Promise.all(await this.Repository.latest())
    let response = rates.reduce((all, rate) => {
      all[rate.provider] = {
        value: rate.value,
        last_updated: rate.last_updated
      }
      return all
    }, {})
    
    return res.json({rates: response})

  }

  /**
   * Express callback to update latest rates by provider
   */
  async sync (req, res, next) {
    let rates = await Promise.all(await this.Manager.sync())
    rates = rates.filter(rates => rates)
    return res.json({rates: await this.Repository.saveMany(rates)})
  }
}

module.exports = ClientController