const mongoose = require('mongoose');

const informationSchema = mongoose.Schema({
	name: {
		type: String
	},
	explanation: {
		type: String,
	},
	explanationVideo: {
		type: String
	},
	googleFormLink: {
		type: String
	}
})

module.exports = informationSchema;