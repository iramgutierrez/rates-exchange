'use strict'

const jwt = require('jsonwebtoken')


/**
 * Generate a JWT from a payload given
 */
let signToken = (payload, secret, options) => 
  new Promise((resolve, reject) => 
    jwt.sign(payload, secret, options, (err, token) => err ? reject(err) : resolve(token))
  )

/**
 * Decode the token given and retrieve the payload
 */
let decodeToken = async (token, secret, options) => 
  new Promise((resolve, reject) => 
    jwt.verify(token, secret, options, (err, decoded) =>  err ? reject(err) : resolve(decoded))
  )

let createToken = async (secret, client, options) => {
  let id = client._id
  let payload = {
    publicId: id,
    name: client.name,
    limit: client.limit,
    sessionId: client.sessionId
  }

  return await signToken(payload, secret, options).catch(err => Promise.reject(err.message || err))
}

module.exports =  {createToken, decodeToken}