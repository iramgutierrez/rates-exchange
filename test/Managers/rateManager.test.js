'use strict'

const RateManager = require('../../exchange/Managers/RateManager')
const entity = require('../mock/rateEntity')
const fakeProviders = require('../mock/providers.json')
const fakeServices = require('../mock/services')


test(`retrieve a array of providers response`, async () => {
  const manager = new RateManager(entity, fakeServices, fakeProviders)

  let latest = await Promise.all(await manager.sync())
  expect(latest.length === 3).toBeTruthy()
  expect(latest[0]).toBeTruthy()
  expect(latest[1]).toBeFalsy()
  expect(latest[2]).toBeFalsy()
})