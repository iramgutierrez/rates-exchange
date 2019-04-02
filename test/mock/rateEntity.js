'use strict'

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
		},
		{
				"_id": "3",
				"provider": "Fake3",
				"value": 19.3779,
				"last_updated": "2019-04-02T21:46:00.590Z",
				"__v": 0
		}
]

module.exports = {
	findOne: (query, fields, options) => rates.shift(),
	insertMany: rates => rates
}