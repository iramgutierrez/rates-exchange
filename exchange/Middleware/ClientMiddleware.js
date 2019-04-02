'use strict'

const Repository = require('../Repositories/ClientRepository')
const {decodeToken} =  require('../Tasks/AuthTask')

/**
 * ClientRepository
 * decodeToken
 */
class ClientMiddleware {
  constructor (Repository, decodeToken) {
    this.Repository = Repository
    this.decodeToken = decodeToken
  }

  static get injectable () { return true }

  static get inject () {
    return [
      Repository,
      decodeToken
    ]
  }

  /**
   * Express middleware to verify if a JWT given is valid
   */
  async verifyToken (req, res, next) {
    if (typeof req.headers.authorization === 'undefined') {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    let token = req.headers.authorization
    token = token.replace('Bearer ', '')

    let payload = await this.decodeToken(token, process.env.JWT_SECRET)
      .catch(e => res.status(401).json({ error: e.message || e }))

    let client = await this.Repository.findById(payload.publicId)
      .catch(e => res.status(401).json({error: 'Invalid JWT'}))

    if (client.sessionId !== payload.sessionId) {
      return res.status(401).json({error: 'Invalid session JWT'})
    }

    req.payload = payload
    req.client = client

    return next()
  }

  /**
   * Express middleware to verify if a JWT has available requests
   */
  async verifyRequests (req, res, next) {
    if (req.client.count >= req.payload.limit) {
      return res.status(401).json({ error: 'This client has been reached the rate limit'})
    }
    req.client.count++

    await req.client.save()

    return next()
  }
}

module.exports = ClientMiddleware