const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');

// calculate based on pressed operator object
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': secondNumber => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let waitNextValue = false;

// function to send pressed numbers to UI
sendNumberValue = number => {
  // replace current value if first value inserted
  if (waitNextValue) {
    calculatorDisplay.textContent = number;
    waitNextValue = false;
  } else {
    // check if current value is 0 then replace it else add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
};

// add decimal function
addDecimal = () => {
  // if operator pressed => don't add anoher
  if (waitNextValue) return;
  // if not decimal found => add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

// use operator function
useOperator = operator => {
  const currentValue = Number(calculatorDisplay.textContent);
  // prevent multi operators
  if (operatorValue && waitNextValue) {
    // reset the operator value to whatever current operator is
    operatorValue = operator;
    return;
  }
  // assign first value if no value exist
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // store next value /opertaor
  waitNextValue = true;
  operatorValue = operator;
};

// reset values and UI function
resetAll = () => {
  firstValue = 0;
  operatorValue = '';
  waitNextValue = false;
  calculatorDisplay.textContent = '0';
};

// Add event Listeners for numbers & operators
inputBtns.forEach(inputBtn => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', addDecimal);
  }
});

// clear event
clearBtn.addEventListener('click', resetAll);


// fork promena