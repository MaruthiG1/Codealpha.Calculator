const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


// Add number to display
function appendNumber(number) {

    if (display.value === "0" || waitingForSecondNumber) {
        display.value = number;
        waitingForSecondNumber = false;
    } else {
        display.value += number;
    }
}


// Add decimal point
function appendDecimal() {

    if (waitingForSecondNumber) {
        display.value = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if (!display.value.includes(".")) {
        display.value += ".";
    }
}


// Select operator
function chooseOperator(selectedOperator) {

    const currentNumber = parseFloat(display.value);

    if (operator !== null && waitingForSecondNumber) {
        operator = selectedOperator;
        return;
    }

    if (firstNumber === null) {
        firstNumber = currentNumber;
    } 
    else if (operator !== null) {
        const result = performCalculation(
            firstNumber,
            currentNumber,
            operator
        );

        display.value = result;
        firstNumber = result;
    }

    operator = selectedOperator;
    waitingForSecondNumber = true;
}


// Perform calculation
function performCalculation(first, second, operator) {

    switch (operator) {

        case "+":
            return first + second;

        case "-":
            return first - second;

        case "*":
            return first * second;

        case "/":
            if (second === 0) {
                return "Error";
            }
            return first / second;

        case "%":
            return first % second;

        default:
            return second;
    }
}


// Calculate final result
function calculate() {

    if (operator === null || firstNumber === null) {
        return;
    }

    const secondNumber = parseFloat(display.value);

    const result = performCalculation(
        firstNumber,
        secondNumber,
        operator
    );

    display.value = result;

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
}


// Clear calculator
function clearDisplay() {

    display.value = "0";

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
}


// Delete last digit
function deleteLast() {

    if (
        display.value.length === 1 ||
        display.value === "Error"
    ) {
        display.value = "0";
    } 
    else {
        display.value = display.value.slice(0, -1);
    }
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key);
    }

    else if (key === ".") {
        appendDecimal();
    }

    else if (["+", "-", "*", "/", "%"].includes(key)) {
        chooseOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});