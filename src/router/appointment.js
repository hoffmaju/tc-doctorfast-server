const express = require('express');
const conn1  = require('../../index');
const conn2  = require('../../index');
const router = express.Router();

router.post('/appointments/create', async (req, res) => {
		const { name, email, date, department, procedure, noquestions, nodiscussion, consented, refused, readThrough } = req.body
		console.log(procedure)
		try {
			const appointment = new conn1.Appointment({ name, email, date, department, procedure, noquestions, nodiscussion, consented, refused, readThrough })
			await appointment.save()
			res.status(201).send({ message: "Appointment created successfully" })
		} catch(error) {
			res.status(500).end()
		}
	}
)

router.post('/appointments/addprocedure', async (req, res) => {
	const { name, email, department, procedureName } = req.body
	try {
		const appointment = await conn1.Appointment.findOne({name: name, email: email, department: department})
		console.log(appointment)
		if (!appointment) {
            res.status(400).send({ error: "No such appointment found in database. Either one or more parameters are wrong or appointment doesn't exist." })
            return
        }
		
		const procedure = await conn1.Procedure.findOne({name: procedureName}).populate({path: 'information', model: conn2.Information})
		console.log(procedure)
		if (!procedure) {
            res.status(400).send({ error: "No such procedure found in database. Either one or more parameters are wrong or procedure doesn't exist." })
            return
        }
		appointment.procedure.push(procedure)
		console.log(appointment)
		await appointment.save()
		res.status(201).send({ message: "Appointment updated with Procedure successfully" })
	} catch(error) {
		res.status(500).end()
	}
})

router.get('/appointments/appointment', async (req, res) => {
	try {
		let appointmentID = req.query.appointmentID
		let procedureID = req.query.procedureID
		if (!appointmentID || !procedureID) {
            res.status(400).send({ error: "No such appointmentID found in database. Either one or more parameters are wrong or appointment doesn't exist." })
            return
        }
		if (!(await conn1.Appointment.exists({_id: appointmentID})) || !(await conn1.Procedure.exists({_id: procedureID}))) {
            res.status(400).send({ error: "No such appointment/procedure found in database." })
            return
        }
		
		const appointment = await conn1.Appointment.find({_id:appointmentID})
										.populate({ path: 'procedure', populate: {path: 'information', model: conn2.Information} })
		console.log(appointment)
		res.status(201).send(appointment)
	} catch(error) {
		console.log(error)
		res.status(500).end()
	}
})

router.post('/appointments/confirmation', async (req, res) => {
	try {
		let { id, noquestions, nodiscussion, consented, refused, readThrough } = req.body
		let appointment = await conn1.Appointment.findByIdAndUpdate(id, {noquestions: noquestions, nodiscussion: nodiscussion, consented: consented, refused: refused, readThrough: readThrough})
		if (!appointment) {
            res.status(400).send({ error: "No such appointment found in database." })
            return
        }
		res.status(201).send("Consultation wish updated successfully")
	} catch(error) {
		console.log(error)
		res.status(500).end()
	}
})

module.exports = router;