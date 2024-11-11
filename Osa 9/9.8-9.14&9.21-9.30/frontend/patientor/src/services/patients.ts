import axios from 'axios';
import { Patient, PatientFormValues, NewEntry, Entry } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, entry: NewEntry): Promise<Entry> => {
  console.log(entry);
  const response = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return response.data;
};

export default {
  getAll,
  create,
  get,
  addEntry,
};
