interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export function calculateExercises(
  dailyHours: number[],
  target: number
): Result {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((day) => day > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job, target met or exceeded';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'needs improvement, target not met';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

if (require.main === module) {
  interface ExerciseValues {
    target: number
    dailyHours: number[]
  }

  const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const dailyHours = args.slice(3).map((arg) => Number(arg));

    if (isNaN(target) || dailyHours.some(isNaN)) {
      throw new Error('All values must be numbers!');
    }

    return {
      target,
      dailyHours,
    };
  };

  try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    const result = calculateExercises(dailyHours, target);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong:';
    if (error instanceof Error) {
      errorMessage += ' ' + error.message;
    }
    console.error(errorMessage);
  }
}
