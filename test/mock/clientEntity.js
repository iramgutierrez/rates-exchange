'use strict'

let clients = [
  {
    "_id" : 1,
    "name" : "web1",
    "clientSecret" : "qwerty",
    "clientId" : "qwerty",
    "sessionId" : "1554241569369",
    "count" : 1,
    "limit" : 5
  },
  {
    "_id" : 2,
    "name" : "web2",
    "clientSecret" : "abcd",
    "clientId" : "abcd",
    "sessionId" : 1554232224671,
    "count" : 0
  },
  {
    "_id" :3,
    "name" : "web3",
    "clientSecret" : "123456",
    "clientId" : "123456",
    "sessionId" : 1554232224671,
    "count" : 0
  },
  {
    "_id" : 4,
    "name" : "web4",
    "clientSecret" : "poiuyt",
    "clientId" : "poiuyt",
    "sessionId" : 1554232224671,
    "count" : 0
  }
]

module.exports = {
  find: () => clients,
  findById: id => {
    if (id === 4) {
      return {
        "_id" : 4,
        "name" : "web4",
        "clientSecret" : "poiuyt",
        "clientId" : "poiuyt",
        "sessionId" : 1554232224671,
        "count" : 0
      }
    }

    return null
  },
  findOne: data => {
    if (data.clientId === 'a' && data.clientSecret === 'a') {
      return {
        "_id" : 4,
        "name" : "web4",
        "clientSecret" : "poiuyt",
        "clientId" : "poiuyt",
        "sessionId" : 1554232224671,
        "count" : 0
      }
    }

    return null
  }
}