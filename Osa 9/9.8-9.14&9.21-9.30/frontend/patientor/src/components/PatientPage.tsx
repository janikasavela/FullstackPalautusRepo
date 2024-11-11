import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { Patient, Diagnose, FormEntry } from '../types';
import patientService from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from './EntryDetails';

const PatientPage = ({ diagnoses }: { diagnoses: Diagnose[] }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    description: '',
    date: '',
    specialist: '',
    healthCheckRating: '0',
    diagnosisCodes: [] as string[],
    type: 'HealthCheck' as
      | 'HealthCheck'
      | 'Hospital'
      | 'OccupationalHealthcare',
    dischargeDate: '',
    dischargeCriteria: '',
    employerName: '',
    sickLeaveStartDate: '',
    sickLeaveEndDate: '',
  });

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.get(id);
        setPatient(fetchedPatient);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) return <Typography>Loading...</Typography>;

  const genderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'other':
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  const getDiagnosisDescription = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? `${diagnosis.name} (${diagnosis.latin || ''})` : code;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiagnosisChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFormData((prev) => ({
      ...prev,
      diagnosisCodes: event.target.value as string[],
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value as
        | 'HealthCheck'
        | 'Hospital'
        | 'OccupationalHealthcare',
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEntryData: FormEntry = {
        ...formData,
        diagnosisCodes: formData.diagnosisCodes,
        discharge: {
          date: formData.dischargeDate,
          criteria: formData.dischargeCriteria,
        },
        healthCheckRating: Number(formData.healthCheckRating),
      };

      const newEntry = await patientService.addEntry(id!, newEntryData);

      // Update patient data in state
      setPatient((prev) =>
        prev ? { ...prev, entries: [...prev.entries, newEntry] } : prev
      );

      // Reset the form
      setFormData({
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: '0',
        diagnosisCodes: [],
        type: 'HealthCheck', // reset type
        dischargeDate: '',
        dischargeCriteria: '',
        employerName: '',
        sickLeaveStartDate: '',
        sickLeaveEndDate: '',
      });
      setError(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          'Error adding entry: ' +
            (error.response?.data?.error || error.message)
        );
      } else {
        setError('An unexpected error occurred: ' + error);
      }
    }
  };
  return (
    <>
      <Box>
        <Typography variant='h4'>
          {patient.name} {genderIcon()}
        </Typography>
        <Typography>SSN: {patient.ssn || 'N/A'}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography>Date of Birth: {patient.dateOfBirth || 'N/A'}</Typography>
      </Box>

      <Box mt={4}>
        <Typography variant='h5'>Add New Entry</Typography>
        {error && <Typography color='error'>{error}</Typography>}
        <form onSubmit={handleFormSubmit}>
          <TextField
            label='Description'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Date'
            name='date'
            type='date'
            value={formData.date}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label='Specialist'
            name='specialist'
            value={formData.specialist}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <FormControl component='fieldset' fullWidth margin='normal'>
            <FormLabel component='legend'>Health Check Rating</FormLabel>
            <RadioGroup
              name='healthCheckRating'
              value={formData.healthCheckRating}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel value='0' control={<Radio />} label='0' />
              <FormControlLabel value='1' control={<Radio />} label='1' />
              <FormControlLabel value='2' control={<Radio />} label='2' />
              <FormControlLabel value='3' control={<Radio />} label='3' />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth margin='normal'>
            <InputLabel>Entry Type</InputLabel>
            <Select
              value={formData.type}
              onChange={handleTypeChange}
              label='Entry Type'
            >
              <MenuItem value='HealthCheck'>Health Check</MenuItem>
              <MenuItem value='Hospital'>Hospital</MenuItem>
              <MenuItem value='OccupationalHealthcare'>
                Occupational Healthcare
              </MenuItem>
            </Select>
          </FormControl>

          {formData.type === 'Hospital' && (
            <>
              <TextField
                label='Discharge Date'
                name='dischargeDate'
                type='date'
                value={formData.dischargeDate}
                onChange={handleInputChange}
                fullWidth
                margin='normal'
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label='Discharge Criteria'
                name='dischargeCriteria'
                value={formData.dischargeCriteria}
                onChange={handleInputChange}
                fullWidth
                margin='normal'
              />
            </>
          )}

          {formData.type === 'OccupationalHealthcare' && (
            <>
              <TextField
                label='Employer Name'
                name='employerName'
                value={formData.employerName}
                onChange={handleInputChange}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Sick Leave Start Date'
                name='sickLeaveStartDate'
                type='date'
                value={formData.sickLeaveStartDate}
                onChange={handleInputChange}
                fullWidth
                margin='normal'
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label='Sick Leave End Date'
                name='sickLeaveEndDate'
                type='date'
                value={formData.sickLeaveEndDate}
                onChange={handleInputChange}
                fullWidth
                margin='normal'
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}

          <FormControl fullWidth margin='normal'>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              multiple
              value={formData.diagnosisCodes}
              onChange={handleDiagnosisChange}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} - {diagnosis.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type='submit' variant='contained' color='primary'>
            Add Entry
          </Button>
        </form>
      </Box>

      <Box mt={4}>
        <Typography variant='h5'>Entries</Typography>
        <List>
          {patient.entries.map((entry) => (
            <ListItem key={entry.id} divider>
              <EntryDetails
                entry={entry}
                getDiagnosisDescription={getDiagnosisDescription}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default PatientPage;
