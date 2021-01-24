const mongoose = require('mongoose');
const conn2 = require('../../index');

const procedureSchema = mongoose.Schema({
	name: {
		type: String
	},
	information: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: conn2.Information,
	}],	
})
	
module.exports = procedureSchema;