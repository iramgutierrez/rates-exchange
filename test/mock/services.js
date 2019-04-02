'use strict'

module.exports = {
	Fake1Service: {
		sync: provider => {
			return {
				provider: provider.name,
				value: 10,
				last_updated: new Date()
			}
		}
	},
	Fake2Service: {
		sync: provider => false
	},
	Fake3Service: {
		sync: provider => false
	}
}