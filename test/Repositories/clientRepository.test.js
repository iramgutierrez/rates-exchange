'use strict'

const ClientRepository = require('../../exchange/Repositories/ClientRepository')
const entity = require('../mock/clientEntity')

test(`retrieve all clients`, async () => {
  const repository = new ClientRepository(entity)

  let allClients = await repository.all()
  expect(allClients.length === 4).toBeTruthy()
})

test(`find a client by id`, async () => {
  const repository = new ClientRepository(entity)

  let client = await repository.findById(4)
  expect(client).toBeTruthy()
})


test(`find a non exists client by id`, async () => {
  const repository = new ClientRepository(entity)

  let client = await repository.findById(10)
  expect(client).toBeNull()
})



test(`authenticate a client with valid credentials`, async () => {
  const repository = new ClientRepository(entity)

  let validCredentials = { clientId: 'a', clientSecret: 'a' }

  let client = await repository.auth(validCredentials)
  expect(client).toBeTruthy()
})


test(`authenticate a client without valid credentials`, async () => {
  const repository = new ClientRepository(entity)

  let validCredentials = { clientId: 'b', clientSecret: 'b' }

  let client = await repository.auth(validCredentials)
  expect(client).toBeNull()
})