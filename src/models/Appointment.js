const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	date: {
		type: String
	},
	department: {
		type: String
	},
	procedure: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Procedure',
	}],
	noquestions: {
		type: Boolean
	},
	nodiscussion: {
		type: Boolean
	},
	noquestions: {
		type: Boolean
	},
	noquestions: {
		type: Boolean
	},
	readThrough: {
		type: Boolean
	},
})

module.exports = appointmentSchema;