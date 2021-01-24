const express = require('express');
const conn1  = require('../../index');
const conn2  = require('../../index');
const router = express.Router();

router.post('/procedures', async (req, res) => {
	const { name, information } = req.body
	try {
		const procedure = new conn1.Procedure({ name, information})
		await procedure.save()
		res.status(201).send({ message: "Procedure created successfully" })
	} catch(error) {
		res.status(500).end()
	}
})

router.post('/procedures/addInformation', async (req,res) => {
	const {procedureName, infoName} = req.body
	try {
		const procedure = await conn1.Procedure.findOne({name: procedureName})
		if (!procedure) {
			res.status(400).send({ error: "No procedure with this name and information found."})
				return
		}
		console.log(procedure)
		const information = await conn2.Information.findOne({name: infoName})
		if (!information) {
			res.status(400).send({ error: "No information with this name and information found."})
				return
		}
		console.log(information)
		procedure.information.push(information)
		console.log(procedure)
		await procedure.save()
		res.status(201).send({ message: "Procedure updated with Information successfully" })
	} catch(error) {
		res.status(500).end()
	}
})

router.get('/procedures/procedure', async (req, res) => {
	try {
		let name = req.query.name
		let information = req. query.information
		var procedure = await conn1.Procedure.find({ name: name, information: information })
		if (!procedure) {
			res.status(400).send({ error: "No procedure with this name and information found."})
				return
		}
		res.status(200).send(procedure)
	} catch(error) {
		console.log(error)
		res.status(500).end()
	}
})

module.exports = router;