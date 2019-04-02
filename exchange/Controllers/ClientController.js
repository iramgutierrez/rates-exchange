'use strict'

const Repository = require('../Repositories/ClientRepository')
const {createToken} =  require('../Tasks/AuthTask')

/**
 * ClientRepository
 * CreateTokenManager
 */
class ClientController {
  constructor (Repository, createToken) {
    this.Repository = Repository
    this.createToken = createToken
  }
  static get injectable () { return true }

  static get inject () {
    return [
      Repository,
      createToken
    ]
  }

  /**
   * Express callback to verify client credentials and generate a valid JWT
   */
  async auth (req, res, next) {
    let credentials = {
      clientId: req.body.clientId,
      clientSecret: req.body.clientSecret
    }

    let client = await this.Repository.auth(credentials)

    if (!client) { return res.status(401).json({error: 'Invalid credentials'}) }

    client.sessionId = (new Date()).getTime()
    client.count = 0

    let token = await this.createToken(process.env.JWT_SECRET, client, {})

    await client.save()

    return res.json({token})

  }
}

module.exports = ClientController