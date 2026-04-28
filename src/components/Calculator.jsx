import useCalculator from '../hooks/useCalculator';
import OperationForm from './OperationForm';
import ResultDisplay from './ResultDisplay';
import '../styles/calculator.css';

function Calculator() {
  const {
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
  } = useCalculator();

  return (
    <div className="calculator">
      <OperationForm
        firstNumber={firstNumber}
        secondNumber={secondNumber}
        operation={operation}
        setFirstNumber={setFirstNumber}
        setSecondNumber={setSecondNumber}
        setOperation={setOperation}
        onSubmit={calculate}
        loading={loading}
      />
      <ResultDisplay
        result={result}
        error={error}
        onReset={reset}
      />
    </div>
  );
}

export default Calculator;