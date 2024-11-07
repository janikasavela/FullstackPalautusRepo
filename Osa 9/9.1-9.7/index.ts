import express, { Request, Response } from 'express'
import { calculateExercises } from './exerciseCalculator'
import { calculateBmi } from './bmiCalculator'

const app = express()
const PORT = 3003

app.use(express.json())

app.get('/hello', (_req: Request, res: Response): void => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req: Request, res: Response): Response => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  const bmi = calculateBmi(height, weight)
  return res.json({
    weight,
    height,
    bmi,
  })
})

app.post('/exercises', (req: Request, res: Response): Response => {
  const {
    daily_exercises,
    target,
  }: { daily_exercises: number[]; target: number } = req.body

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' })
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(isNaN) ||
    isNaN(target)
  ) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  const result = calculateExercises(daily_exercises, target)

  return res.json(result)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
