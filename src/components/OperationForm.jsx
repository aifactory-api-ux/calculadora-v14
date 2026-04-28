function OperationForm({
  firstNumber,
  secondNumber,
  operation,
  setFirstNumber,
  setSecondNumber,
  setOperation,
  onSubmit,
  loading,
}) {
  const handleNumberClick = (digit) => {
    const currentField = document.activeElement.dataset?.field;

    if (currentField === 'second') {
      setSecondNumber((prev) => {
        if (prev === '0' && digit !== '.') return digit;
        return prev + digit;
      });
    } else {
      setFirstNumber((prev) => {
        if (prev === '0' && digit !== '.') return digit;
        return prev + digit;
      });
    }
  };

  const handleDecimalClick = () => {
    const currentField = document.activeElement.dataset?.field;

    if (currentField === 'second') {
      if (!secondNumber.includes('.')) {
        setSecondNumber((prev) => (prev === '' ? '0.' : prev + '.'));
      }
    } else {
      if (!firstNumber.includes('.')) {
        setFirstNumber((prev) => (prev === '' ? '0.' : prev + '.'));
      }
    }
  };

  const handleBackspace = () => {
    const currentField = document.activeElement.dataset?.field;

    if (currentField === 'second') {
      setSecondNumber((prev) => prev.slice(0, -1));
    } else {
      setFirstNumber((prev) => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    setFirstNumber('');
    setSecondNumber('');
  };

  const handleOperationClick = (op) => {
    setOperation(op);
  };

  return (
    <>
      <div className="display">
        <div className="display-expression">
          {firstNumber || '0'} {operation === 'add' ? '+' : '-'} {secondNumber || '0'}
        </div>
        {loading ? (
          <div className="display-result">Calculating...</div>
        ) : null}
      </div>
      <div className="buttons">
        <button
          className="btn btn-clear"
          onClick={handleClear}
          type="button"
        >
          C
        </button>
        <button
          className="btn btn-backspace"
          onClick={handleBackspace}
          type="button"
        >
          ⌫
        </button>
        <button
          className="btn btn-operation"
          onClick={() => handleOperationClick('subtract')}
          type="button"
        >
          -
        </button>
        <button
          className={`btn btn-operation ${operation === 'add' ? 'active' : ''}`}
          onClick={() => handleOperationClick('add')}
          type="button"
        >
          +
        </button>

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('7')}
          type="button"
        >
          7
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('8')}
          type="button"
        >
          8
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('9')}
          type="button"
        >
          9
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('4')}
          type="button"
        >
          4
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('5')}
          type="button"
        >
          5
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('6')}
          type="button"
        >
          6
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('1')}
          type="button"
        >
          1
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('2')}
          type="button"
        >
          2
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('3')}
          type="button"
        >
          3
        </button>
        <button
          className="btn btn-decimal"
          onClick={handleDecimalClick}
          type="button"
        >
          .
        </button>
        <button
          className="btn btn-number"
          onClick={() => handleNumberClick('0')}
          type="button"
        >
          0
        </button>
        <button
          className="btn btn-equals"
          onClick={onSubmit}
          type="button"
        >
          =
        </button>
      </div>
    </>
  );
}

export default OperationForm;