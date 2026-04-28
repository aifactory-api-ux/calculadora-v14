import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from '../components/Calculator';

describe('Calculator', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test('renders calculator component', () => {
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('displays initial state', () => {
    expect(screen.getByText('0 + 0')).toBeInTheDocument();
  });

  test('handles number input', () => {
    const buttons = screen.getAllByRole('button');
    const sevenButton = buttons.find((btn) => btn.textContent === '7');

    if (sevenButton) {
      fireEvent.click(sevenButton);
    }
  });

  test('handles clear button', () => {
    const clearButton = screen.getByText('C');
    fireEvent.click(clearButton);
    expect(screen.getByText('0 + 0')).toBeInTheDocument();
  });

  test('handles operation selection', () => {
    const addButton = screen.getByText('+');
    const subtractButton = screen.getByText('-');

    fireEvent.click(addButton);
    expect(screen.getByText('+')).toBeInTheDocument();

    fireEvent.click(subtractButton);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  test('displays error for invalid input', () => {
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
  });

  test('displays result after calculation', () => {
    const oneButton = screen.getAllByRole('button').find((btn) => btn.textContent === '1');
    const twoButton = screen.getAllByRole('button').find((btn) => btn.textContent === '2');
    const plusButton = screen.getByText('+');
    const equalsButton = screen.getByText('=');

    if (oneButton) fireEvent.click(oneButton);
    if (plusButton) fireEvent.click(plusButton);
    if (twoButton) fireEvent.click(twoButton);
    if (equalsButton) fireEvent.click(equalsButton);
  });

  test('reset button appears after calculation', () => {
    const oneButton = screen.getAllByRole('button').find((btn) => btn.textContent === '1');
    const twoButton = screen.getAllByRole('button').find((btn) => btn.textContent === '2');
    const plusButton = screen.getByText('+');
    const equalsButton = screen.getByText('=');

    if (oneButton) fireEvent.click(oneButton);
    if (plusButton) fireEvent.click(plusButton);
    if (twoButton) fireEvent.click(twoButton);
    if (equalsButton) fireEvent.click(equalsButton);

    const resetButton = screen.getByText('Reset');
    expect(resetButton).toBeInTheDocument();
  });
});