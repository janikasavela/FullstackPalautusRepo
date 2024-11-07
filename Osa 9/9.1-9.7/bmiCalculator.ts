export const calculateBmi = (height: number, weight: number): void => {
  const heightInMeteres = height / 100;
  const bmi = weight / (heightInMeteres * heightInMeteres);

  if (bmi < 18.5) {
    console.log('underweight');
  } else if (bmi >= 18.5 && bmi < 24.9) {
    console.log('normal range');
  } else if (bmi >= 25 && bmi < 29.9) {
    console.log('overweight');
  } else {
    console.log('obese');
  }
};

if (require.main === module) {
  interface CalucalteValues {
    value1: number
    value2: number
  }

  const parseArguments = (args: string[]): CalucalteValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3]),
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

  try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateBmi(value1, value2);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
