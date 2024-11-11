import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient, EntryWithoutId } from '../types';
import { newPatientSchema, parseDiagnosisCodes, entrySchema } from '../utils';

import * as z from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getSensitivePatients());
});

router.get(
  '/:id',
  (
    req: Request<{ id: string }>,
    res: Response<NonSensitivePatient | { error: string }>
  ) => {
    const patient = patientService.getSensitivePatient(req.params.id);
    if (patient) {
      res.send(patient);
    } else {
      res.status(404).send({ error: 'Patient not found' });
    }
  }
);

router.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient({
      ...newPatient,
      entries: [],
    });
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // Log the incoming data for debugging
    const diagnosisCodes = parseDiagnosisCodes(req.body);

    const newEntry = entrySchema.parse({
      ...req.body,
      diagnosisCodes,
    });

    const addedEntry = patientService.addEntry(
      req.params.id,
      newEntry as EntryWithoutId
    );
    if (!addedEntry) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    return res.json(addedEntry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.errors); // Log the validation errors
      return res.status(400).json({ error: error.errors });
    } else {
      console.error('Unknown error:', error);
      return res.status(400).json({ error: 'Unknown error' });
    }
  }
});

export default router;
