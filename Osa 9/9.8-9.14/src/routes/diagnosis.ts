import express, { Response } from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnose[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a dignose!');
});

export default router;
