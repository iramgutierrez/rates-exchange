'use strict'

const RateRepository = require('../../exchange/Repositories/RateRepository')
const entity = require('../mock/rateEntity')
const fakeProviders = require('../mock/providers.json')


test(`retrieve a array with providers response`, async () => {
  const repository = new RateRepository(entity, fakeProviders)

  let latest = await Promise.all(await repository.latest())
  expect(latest.length === 3).toBeTruthy()
})

test(`save many rates`, async () => {
  const repository = new RateRepository(entity, fakeProviders)

  let rates = [
    {
      "_id": "1",
      "provider": "Fake1",
      "value": 21.544017,
      "last_updated": "2019-04-02T21:46:00.619Z",
      "__v": 0
    },
    {
      "_id": "2",
      "provider": "Fake2",
      "value": 19.2279,
      "last_updated": "2019-04-02T21:46:00.641Z",
      "__v": 0
    }
  ]

  let saved = await repository.saveMany(rates)
  expect(saved.length === rates.length).toBeTruthy()
})