import patientData from '../data/patients.ts';
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  EntryWithoutId,
} from '../types.ts';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getSensitivePatient = (rId: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === rId);
  if (!patient) {
    return undefined;
  }

  return patient;
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

const addEntry = (
  patientId: string,
  entry: EntryWithoutId
): Entry | undefined => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) return undefined;

  const newEntry: Entry = {
    ...entry,
    id: uuidv4(),
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getSensitivePatients,
  getSensitivePatient,
  addEntry,
};
