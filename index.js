const resultDisplay = document.getElementById('result');
const historyDisplay = document.getElementById('history');

let currentInput = 0;
let previousInput = "";
let operation = null;
let resetScreen = false;


function updateDisplay() {
    if (currentInput === 'Error') {
        resultDisplay.innerText = currentInput;
        return;
    }

    const parts = currentInput.split('.');
    let formattedValue = parseFloat(parts[0]).toLocaleString('en-US');

    if (parts[0] === '0') formattedValue = '0';
    if (currentInput === '-') formattedValue = '-';

    if (parts.length > 1) {
        resultDisplay.innerText = formattedValue + '.' + parts[1] ;
    } else {
        resultDisplay.innerText = currentInput === '' ? '0' : formattedValue;
    }
}

function appendNumber (number) {
    if(currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal(dot) {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        updateDisplay();
        return
    }
    if (!currentInput.includes(dot)) {
    currentInput += dot} ;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    resetScreen = false;
    historyDisplay.innerText = '';
    updateDisplay();
}

function toggleSign() {
    if (currentInput === '0' || currentInput === 'Error') return;
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null && !resetScreen) {
        calculate();
    }

    previousInput = currentInput;
    operation = op;

    let visualOp = op;
    if (op === '*') visualOp = '×';
    if (op === '/') visualOp = '÷';

    historyDisplay.innerText = `${parseFloat(previousInput).toLocaleString('en-US')} ${visualOp}`;
    resetScreen = true;
}    

function calculate() {
    if (operation === null || resetScreen) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        case '%':    
            result = (prev % current) / 100;
            break;
        default:
            return;    
    }

    let visualOp = operation;
    if (operation === '*') visualOp = '×';
    if (operation === '/') visualOp = '÷';
    historyDisplay.innerText = `${prev.toLocaleString('en-US')} ${visualOp} ${current.toLocaleString('en-US')} =`;

    currentInput = parseFloat(result.toFixed(10)).toString();
    operation = null;
    resetScreen = true;
    updateDisplay();

}    