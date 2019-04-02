'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const di  = require('basic-di')
const ClientController = require('./exchange/Controllers/ClientController')
const ClientMiddleware = require('./exchange/Middleware/ClientMiddleware')
const RateController = require('./exchange/Controllers/RateController')

dotenv.config()
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true })

const app = express()
app.use(bodyParser.json())

const clientController = di.create(ClientController)
const clientMiddleware = di.create(ClientMiddleware)

const rateController = di.create(RateController)

/**
 * Initialize the app
 */
let bootstrap = async () => {
  
  app.post('/auth', clientController.auth.bind(clientController))
  app.get('/check', 
    clientMiddleware.verifyToken.bind(clientMiddleware),
    clientMiddleware.verifyRequests.bind(clientMiddleware),
    rateController.check.bind(rateController)
  )
  app.get('/sync', 
    clientMiddleware.verifyToken.bind(clientMiddleware),
    clientMiddleware.verifyRequests.bind(clientMiddleware),
    rateController.sync.bind(rateController)
  )

  app.listen(3000, () => console.log('Rate Exchange API listening on port 3000!'))
}

bootstrap()





