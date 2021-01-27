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
	consented: {
		type: Boolean
	},
	refused: {
		type: Boolean
	},
	readThrough: {
		type: Boolean
	},
})

module.exports = appointmentSchema;
