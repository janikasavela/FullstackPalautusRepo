import express from 'express';
import cors from 'cors';
const app = express();
import diagnoseRouter from './routes/diagnosis';
import patientRouter from './routes/patients';
import errorMiddleware from './middleware/errorMiddleware';

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
