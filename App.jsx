import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculateOperation(currentValue, inputValue, operator);

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculateOperation = (prevValue, nextValue, op) => {
    switch (op) {
      case '+':
        return prevValue + nextValue;
      case '-':
        return prevValue - nextValue;
      case '*':
        return prevValue * nextValue;
      case '/':
        return prevValue / nextValue;
      default:
        return nextValue;
    }
  };

  const handleEqual = () => {
    if (!operator) return;

    const inputValue = parseFloat(display);
    const newValue = calculateOperation(prevValue, inputValue, operator);

    setDisplay(String(newValue));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const calculatorStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  };

  const calculatorContainerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const displayStyle = {
    marginBottom: '15px',
    textAlign: 'right',
    fontSize: '24px',
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: '10px',
    borderRadius: '4px',
  };

  const buttonsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={calculatorStyle}>
      <div style={calculatorContainerStyle}>
        <div style={displayStyle}>
          {display}
        </div>
        <div style={buttonsContainerStyle}>
          {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 'C', 0, '=', '/'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (typeof item === 'number') {
                  inputDigit(item);
                } else if (item === '.') {
                  inputDecimal();
                } else if (item === 'C') {
                  clear();
                } else if (item === '=') {
                  handleEqual();
                } else {
                  performOperation(item);
                }
              }}
              style={buttonStyle}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;