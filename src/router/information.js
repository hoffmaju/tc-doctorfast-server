const express = require('express');
const conn2  = require('../../index');
const router = express.Router();

router.post('/informations', async (req, res) => {
	const { name, explanation, explanationVideo, googleFormLink } = req.body
	try {
		const information = new conn2.Information({ name, explanation, explanationVideo, googleFormLink})
		await information.save()
		res.status(201).send({ message: "Information created successfully" })
	} catch(error) {
		res.status(500).end()
	}
})

router.get('/informations/information', async (req, res) => {
	try {
		let name = req.query.name
		let explanation = req.query.explanation
		let explanationVideo = req.query.explanationVideo
		let googleFormLink = req.query.googleFormLink
		var information = await conn2.Information.find({ name: name, explanation: explanation, explanationVideo:explanationVideo, googleFormLink:googleFormLink })
		if (!information) {
			res.status(400).send({ error: "No information with this name and explanation found."})
				return
		}
		res.status(200).send(information)
	} catch(error) {
		console.log(error)
		res.status(500).end()
	}
})

module.exports = router;