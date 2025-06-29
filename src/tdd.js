export function calculateAverage(numbers) {
  if (numbers.length === 0) return NaN;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Factorial function
export function factorial(number) {
  if (number < 0) return undefined; // Factorial is not defined for negative numbers
  if (number === 0 || number === 1) return 1;
  return number * factorial(number - 1);
}
