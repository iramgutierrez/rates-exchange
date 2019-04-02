'use strict'

const env = require('dotenv')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

var seed = {
  "clients": [
    {
      "name" : "web1",
      "clientSecret" : "qwerty",
      "clientId" : "qwerty",
      "sessionId":  (new Date()).getTime(),
      "count": 0
    },
    {
      "name" : "web2",
      "clientSecret" : "abcd",
      "clientId" : "abcd",
      "sessionId":  (new Date()).getTime(),
      "count": 0
    },
    {
      "name" : "web3",
      "clientSecret" : "123456",
      "clientId" : "123456",
      "sessionId":  (new Date()).getTime(),
      "count": 0
    },
    {
      "name" : "web4",
      "clientSecret" : "poiuyt",
      "clientId" : "poiuyt",
      "sessionId":  (new Date()).getTime(),
      "count": 0
    }
  ]
}
var clients = seed.clients

env.config()

const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`

MongoClient.connect(url, function(err, client) {
  const db = client.db(process.env.DB_NAME)
  const collectionClient = db.collection('clients')
  collectionClient.insertMany(clients, (userClient, clientsResult) => client.close())
})
