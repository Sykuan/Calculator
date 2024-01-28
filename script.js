function add (base, newNum) {
    return base + newNum;
}

function subtract (base, newNum) {
    return base - newNum;
}

function multiply (base, newNum) {
    return base * newNum;
}

function divide (base, newNum) {
    return base / newNum;
}

let isFirstClick = true;
let doubleClickCalc = false;
let doubleClickOp = false;
let calcComplete = false;
let additionalOperator = false;
let currentNum;
let lastNum;
let operator;
let calcValue;

// add event listeners

const btnNums = document.querySelectorAll('.number');
const display = document.querySelector('.display');

btnNums.forEach(button => {
    button.addEventListener('click', () => {
        if (calcComplete && !additionalOperator) {
            currentNum = undefined;
            lastNum = undefined;
            calcValue = undefined;
            calcComplete = false;
        }

        doubleClickCalc = false;
        doubleClickOp = false;

        if (isFirstClick) {
            display.textContent = "";
            display.textContent += button.textContent;
            isFirstClick = false;
        } else {
            display.textContent += button.textContent;
        }
    })
})

const operators = document.querySelectorAll('.operator');
operators.forEach(op => {
    op.addEventListener('click', () => {

        if (calcComplete) {
            additionalOperator = true;
        }

        isFirstClick = true;

        if (typeof calcValue === "undefined") {
            if (!doubleClickOp) {
                doubleClickOp = true;
                currentNum = parseInt(display.textContent);
                lastNum = currentNum;
                console.log(lastNum)
            }
        }

        switch (op.textContent) {
            case "+":
                operator = "add";
                display.textContent = "+"
                break;
            case "-":
                operator = "subtract";
                display.textContent = "-"
                break;
            case "*":
                operator = "multiply";
                display.textContent = "*"
                break;
            case "%":
                operator = "divide";
                display.textContent = "%"
                break;
        }
        console.log(operator);
    })
})

const calculate = document.querySelector('.calculate');
calculate.addEventListener('click', () => {

    isFirstClick = true;
    calcComplete = true;
    additionalOperator = false;

    if (!doubleClickCalc) {
        doubleClickCalc = true;

        currentNum = parseInt(display.textContent);

        if (currentNum != undefined && lastNum != undefined && operator != undefined) {
            switch (operator) {
                case "add":
                    calcValue = add(lastNum, currentNum);
                    display.textContent = calcValue;
                    lastNum = calcValue;
                    break;
                case "subtract":
                    calcValue = subtract(lastNum, currentNum);
                    display.textContent = calcValue;
                    lastNum = calcValue;
                    break;
                case "multiply":
                    calcValue = multiply(lastNum, currentNum);
                    display.textContent = calcValue;
                    lastNum = calcValue;
                    break;
                case "divide":
                    if (currentNum == 0) {
                        alert('your computer will explode');
                        break;
                    } else {
                        calcValue = divide(lastNum, currentNum);
                        display.textContent = calcValue;
                        lastNum = calcValue;
                        break;
                    }
            }
        }   
    }
    console.log(calcValue)
})

const clear = document.querySelector('.clear')
clear.addEventListener('click', () => {
    display.textContent = "";
    currentNum = undefined;
    lastNum = undefined;
    calcValue = undefined;
    calcComplete = false;
})