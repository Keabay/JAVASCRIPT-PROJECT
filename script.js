// Keabay Calculator
// This beginner-friendly calculator supports one operation at a time.

let display = document.getElementById("display");
let expression = document.getElementById("expression");

let currentNumber = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function updateDisplay() {
    display.textContent = currentNumber;
}

function enterNumber(number) {
    if (waitingForSecondNumber) {
        currentNumber = number;
        waitingForSecondNumber = false;
    } else if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber = currentNumber + number;
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    firstNumber = Number(currentNumber);
    operator = selectedOperator;
    waitingForSecondNumber = true;
    expression.textContent = firstNumber + " " + operator;
}

function calculate() {
    if (operator === null || waitingForSecondNumber) {
        return;
    }

    let secondNumber = Number(currentNumber);
    let result = 0;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    } else if (operator === "−") {
        result = firstNumber - secondNumber;
    } else if (operator === "×") {
        result = firstNumber * secondNumber;
    } else if (operator === "÷") {
        if (secondNumber === 0) {
            expression.textContent = "Cannot divide by zero";
            currentNumber = "Error";
            updateDisplay();
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = true;
            return;
        }

        result = firstNumber / secondNumber;
    }

    expression.textContent = firstNumber + " " + operator + " " + secondNumber + " =";
    currentNumber = String(Number(result.toPrecision(10)));
    updateDisplay();

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
}

function clearCalculator() {
    currentNumber = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    expression.textContent = "Ready when you are";
    updateDisplay();
}

function enterDecimal() {
    if (waitingForSecondNumber) {
        currentNumber = "0.";
        waitingForSecondNumber = false;
    } else if (!currentNumber.includes(".")) {
        currentNumber = currentNumber + ".";
    }

    updateDisplay();
}

function changeSign() {
    if (currentNumber !== "0" && currentNumber !== "Error") {
        if (currentNumber.startsWith("-")) {
            currentNumber = currentNumber.slice(1);
        } else {
            currentNumber = "-" + currentNumber;
        }
    }

    updateDisplay();
}

function calculatePercent() {
    if (currentNumber !== "Error") {
        currentNumber = String(Number(currentNumber) / 100);
        updateDisplay();
    }
}

// Each button tells the calculator what to do when it is clicked.
let numberButtons = document.querySelectorAll("[data-number]");
numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        enterNumber(button.dataset.number);
    });
});

let operatorButtons = document.querySelectorAll("[data-operator]");
operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        chooseOperator(button.dataset.operator);
    });
});

document.querySelector('[data-action="equals"]').addEventListener("click", calculate);
document.querySelector('[data-action="clear"]').addEventListener("click", clearCalculator);
document.querySelector('[data-action="decimal"]').addEventListener("click", enterDecimal);
document.querySelector('[data-action="sign"]').addEventListener("click", changeSign);
document.querySelector('[data-action="percent"]').addEventListener("click", calculatePercent);
