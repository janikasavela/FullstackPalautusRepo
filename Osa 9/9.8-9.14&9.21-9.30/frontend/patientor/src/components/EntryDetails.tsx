import { Box, Typography, ListItem, List, ListItemText } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry } from '../types';

interface EntryDetailsProps {
  entry: Entry
  getDiagnosisDescription: (code: string) => string
}

const EntryDetails = ({
  entry,
  getDiagnosisDescription,
}: EntryDetailsProps) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <Box>
          <LocalHospitalIcon color='primary' />
          <Typography variant='body1' fontWeight='bold'>
            Hospital Entry
          </Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Description: {entry.description}</Typography>
          {entry.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  <ListItemText
                    primary={`${code}: ${getDiagnosisDescription(code)}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Typography>Discharge Date: {entry.discharge?.date}</Typography>
          <Typography>Criteria: {entry.discharge?.criteria}</Typography>
        </Box>
      );

    case 'OccupationalHealthcare':
      return (
        <Box>
          <WorkIcon color='secondary' />
          <Typography variant='body1' fontWeight='bold'>
            Occupational Healthcare Entry
          </Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Employer: {entry.employerName}</Typography>
          <Typography>Description: {entry.description}</Typography>
          {entry.sickLeave && (
            <>
              <Typography>
                Sick Leave Start: {entry.sickLeave.startDate}
              </Typography>
              <Typography>Sick Leave End: {entry.sickLeave.endDate}</Typography>
            </>
          )}
          {entry.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  <ListItemText
                    primary={`${code}: ${getDiagnosisDescription(code)}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      );

    case 'HealthCheck':
      return (
        <Box>
          <FavoriteIcon color='action' />
          <Typography variant='body1' fontWeight='bold'>
            Health Check Entry
          </Typography>
          <Typography>Date: {entry.date}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Description: {entry.description}</Typography>
          <Typography>
            Health Check Rating: {entry.healthCheckRating}
          </Typography>
          {entry.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  <ListItemText
                    primary={`${code}: ${getDiagnosisDescription(code)}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

function assertNever(value: never): never {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
}

export default EntryDetails;
