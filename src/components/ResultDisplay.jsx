function ResultDisplay({ result, error, onReset }) {
  let resultClass = 'result-empty';
  let resultContent = 'Enter numbers and press =';

  if (error) {
    resultClass = 'result-error';
    resultContent = error;
  } else if (result !== null) {
    resultClass = 'result-value';
    resultContent = `= ${result}`;
  }

  return (
    <div className="result-display">
      <div className={resultClass}>{resultContent}</div>
      {(result !== null || error) && (
        <button className="reset-btn" onClick={onReset} type="button">
          Reset
        </button>
      )}
    </div>
  );
}

export default ResultDisplay;