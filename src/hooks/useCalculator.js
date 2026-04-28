import { useState, useCallback } from 'react';

const MULTIPLIER = 10000000000;

function toInteger(value) {
  return Math.round(value * MULTIPLIER);
}

function toDecimal(value) {
  return value / MULTIPLIER;
}

function validateNumber(value) {
  if (value === '' || value === null || value === undefined) {
    return 'Number is required';
  }
  const num = parseFloat(value);
  if (isNaN(num)) {
    return 'Invalid number';
  }
  if (!isFinite(num)) {
    return 'Number must be finite';
  }
  return null;
}

function useCalculator() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = useCallback(() => {
    setError(null);
    setResult(null);

    const firstError = validateNumber(firstNumber);
    if (firstError) {
      setError(firstError);
      return;
    }

    const secondError = validateNumber(secondNumber);
    if (secondError) {
      setError(secondError);
      return;
    }

    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);

    if (operation !== 'add' && operation !== 'subtract') {
      setError('Invalid operation');
      return;
    }

    setLoading(true);

    try {
      const firstInt = toInteger(first);
      const secondInt = toInteger(second);

      let resultInt;
      if (operation === 'add') {
        resultInt = firstInt + secondInt;
      } else {
        resultInt = firstInt - secondInt;
      }

      const resultFloat = toDecimal(resultInt);
      setResult(resultFloat);
    } catch (e) {
      setError('Calculation error');
    } finally {
      setLoading(false);
    }
  }, [firstNumber, secondNumber, operation]);

  const reset = useCallback(() => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('add');
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    firstNumber,
    secondNumber,
    operation,
    result,
    error,
    loading,
    setFirstNumber,
    setSecondNumber,
    setOperation,
    calculate,
    reset,
  };
}

export default useCalculator;