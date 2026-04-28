import { renderHook, act } from '@testing-library/react';
import useCalculator from '../hooks/useCalculator';

describe('useCalculator', () => {
  test('returns initial state', () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.firstNumber).toBe('');
    expect(result.current.secondNumber).toBe('');
    expect(result.current.operation).toBe('add');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  test('sets first number', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setFirstNumber('10');
    });

    expect(result.current.firstNumber).toBe('10');
  });

  test('sets second number', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setSecondNumber('5');
    });

    expect(result.current.secondNumber).toBe('5');
  });

  test('sets operation', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setOperation('subtract');
    });

    expect(result.current.operation).toBe('subtract');
  });

  test('calculates addition correctly', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setFirstNumber('10');
    });
    act(() => {
      result.current.setSecondNumber('5');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.result).toBe(15);
    expect(result.current.error).toBeNull();
  });

  test('calculates subtraction correctly', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setFirstNumber('10');
    });
    act(() => {
      result.current.setSecondNumber('5');
    });
    act(() => {
      result.current.setOperation('subtract');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.result).toBe(5);
    expect(result.current.error).toBeNull();
  });

  test('returns error for missing first number', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setSecondNumber('5');
      result.current.calculate();
    });

    expect(result.current.error).toBe('Number is required');
    expect(result.current.result).toBeNull();
  });

  test('returns error for missing second number', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setFirstNumber('10');
      result.current.calculate();
    });

    expect(result.current.error).toBe('Number is required');
    expect(result.current.result).toBeNull();
  });

  test('handles decimal numbers correctly', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setFirstNumber('0.1');
    });
    act(() => {
      result.current.setSecondNumber('0.2');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.result).toBeCloseTo(0.3, 10);
    expect(result.current.error).toBeNull();
  });

  test('handles large numbers', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setFirstNumber('10000000000');
    });
    act(() => {
      result.current.setSecondNumber('10000000000');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.result).toBe(20000000000);
    expect(result.current.error).toBeNull();
  });

  test('resets all state', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setFirstNumber('10');
    });
    act(() => {
      result.current.setSecondNumber('5');
    });
    act(() => {
      result.current.setOperation('subtract');
    });
    act(() => {
      result.current.calculate();
    });

    expect(result.current.result).toBe(5);

    act(() => {
      result.current.reset();
    });

    expect(result.current.firstNumber).toBe('');
    expect(result.current.secondNumber).toBe('');
    expect(result.current.operation).toBe('add');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });
});