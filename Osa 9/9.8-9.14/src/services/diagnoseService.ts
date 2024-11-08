import diagnosesData from '../data/diagnoses.ts';
import { Diagnose } from '../types.ts';

const diagnoses: Diagnose[] = diagnosesData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
