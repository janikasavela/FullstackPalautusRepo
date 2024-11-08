import patientData from '../data/patients.ts';
import { Patient, NonSensitivePatient, NewPatient } from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientData as Patient[];

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const getSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  addPatient,
  getSensitivePatients,
};
