import { NewPatient, Gender, Diagnose } from './types';
import * as z from 'zod';

/* 
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
 */
/* const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment')
  }

  return comment
} */

/* const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}
 */

/* const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
} */

/* const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: z.string().parse(object.name),
      dateOfBirth: z.string().date().parse(object.dateOfBirth),
      ssn: z.string().parse(object.ssn),
      gender: z.nativeEnum(Gender).parse(object.gender),
      occupation: z.string().parse(object.occupation),
    }

    return newPatient
  }
  throw new Error('Incorrect data: some fields are missing')
}
 */

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatient => {
  const parsedData = newPatientSchema.parse(object);
  return {
    ...parsedData,
    entries: [],
  };
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

export const baseEntrySchema = z.object({
  description: z.string(),
  date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date' }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().int().min(0).max(3),
});

export const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date' }),
    criteria: z.string(),
  }),
});

export const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid start date',
      }),
      endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid end date',
      }),
    })
    .optional(),
});

export const entrySchema = z.union([
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);
