const calculator = {
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null,
};


const inputDigit = (digit) => {
	const { displayValue, waitingForSecondOperand } = calculator;

	if (waitingForSecondOperand === true) {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
	} else {
		calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
	}

}

const inputDecimal = (dot) => {
	if (calculator.waitingForSecondOperand === true) {
		calculator.displayValue = '0.'
		calculator.waitingForSecondOperand = false;
		return
	}

	// If the `displayValue` property does not contain a decimal point
	if (!calculator.displayValue.includes(dot)) {
	  // Append the decimal point
	  calculator.displayValue += dot;
	}
}

const handleOperator = (nextOperator) => {
	// Destructure the properties on the calculator object
	const { firstOperand, displayValue, operator } = calculator
	// `parseFloat` converts the string contents of `displayValue`
	// to a floating-point number
	const inputValue = parseFloat(displayValue);

	if (operator && calculator.waitingForSecondOperand)  {
		calculator.operator = nextOperator;
		return;
	}
  
	// verify that `firstOperand` is null and that the `inputValue`
	// is not a `NaN` value
	if (firstOperand === null && !isNaN(inputValue)) {
	  // Update the firstOperand property
	  calculator.firstOperand = inputValue;
	} else if (operator) {
		const result = calculate(firstOperand, inputValue, operator);
	
		calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
		calculator.firstOperand = result;
	}
  
	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
}

const calculate = (firstOperand, secondOperand, operator) => {
	if (operator === '+') {
	  	return firstOperand + secondOperand;
	} else if (operator === '-') {
	  	return firstOperand - secondOperand;
	} else if (operator === '*') {
	  	return firstOperand * secondOperand;
	} else if (operator === '/') {
	  	return firstOperand / secondOperand;
	}
  
	return secondOperand;
}

const resetCalculator = () => {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
}

const updateDisplay = () => {
	// select the element with class of `calculator-screen`
	const display = document.getElementById("calculateInput");
	// update the value of the element with the contents of `displayValue`
	display.value = calculator.displayValue;
}

const keys = document.querySelector('.calculator-buttons');

keys.addEventListener('click', (event) => {
	const { target } = event;
	const { value } = target;
	if (!target.matches('button')) {
		return;
	}

	switch (value) {
		case '+':
		case '-':
		case '*':
		case '/':
		case '=':
			handleOperator(value);
			break;
		case '.':
			inputDecimal(value);
			break;
		case 'all-clear':
			resetCalculator();
			break;
		default:
		// check if the key is an integer
		if (Number.isInteger(parseFloat(value))) {
			inputDigit(value);
		}
	}

	updateDisplay();
});

const Calculate = (event) => {
	event.preventDefault();
}