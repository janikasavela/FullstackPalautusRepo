import express, { Response } from 'express'
import patientService from '../services/patientService'
import { NonSensitivePatient } from '../types'
import { newPatientSchema } from '../utils'
import * as z from 'zod'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getSensitivePatients())
})

router.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body)
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues })
    } else {
      res.status(400).send({ error: 'unknown error' })
    }
  }
})

export default router
