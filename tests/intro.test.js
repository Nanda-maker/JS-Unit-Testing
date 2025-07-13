import { describe, it, expect } from 'vitest';
import { fizzBuzz, max } from '../src/intro';
import { calculateAverage, factorial } from '../src/tdd';
describe('max', () => {
  it('should return the first argument if it is greater', () => {
    // AAA - Arrange,
    // const a = 2;
    // const b = 1;
    // Act
    // const result = max(a, b);
    // Assert
    // expect(result).toBe(2);
    expect(max(2, 1)).toBe(2);
  });
  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });
  it('should return the first argument if it is equal', () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe('fizzBuzz', () => {
  it("should return 'FizzBuzz' for multiples of 3 and 5", () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });
  it("should return 'Fizz' for multiples of 3", () => {
    expect(fizzBuzz(9)).toBe('Fizz');
  });
  it("should return 'Buzz' for multiples of 5", () => {
    expect(fizzBuzz(10)).toBe('Buzz');
  });
});

describe('calculateAverage', () => {
  it('should return NaN if given an empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  it('should calculate the average of array with a single element', () => {
    expect(calculateAverage([10])).toBe(10);
  });
  it('should calculate the average of array with two elements ', () => {
    expect(calculateAverage([10, 20])).toBe(15);
  });
});

describe('factorial', () => {
  it('should return 1 if given 0', () => {
    expect(factorial(0)).toBe(1);
  });
  it('should return 1 if given 1', () => {
    expect(factorial(1)).toBe(1);
  });
  it('should return 2 if given 2', () => {
    expect(factorial(2)).toBe(2);
  });
  it('should return 6 if given 3', () => {
    expect(factorial(3)).toBe(6);
  });
  it('should return undefined if given negative number', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
