let num1 = "";
let num2 = "";
let op = "";

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector("#equals");
let display = document.querySelector("#display");
let clear = document.querySelector("#clear");

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if(op == "") {
            // if operator is blank, add the digit into the display space for num1
            num1 += number.textContent;
            display.value = num1;
        }
        else {
            // if the operator is present, add the digit to num2
            num2 += number.textContent;
            display.value = num2;
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        op = operator.textContent;
    });
});

equals.addEventListener("click", () => {
    let ans = operate(op, parseInt(num1),  parseInt(num2)); // will not handle decmials, will need to fix
    display.value = ans;
    num1 = "";
    num2 = "";
    op = "";
});

clear.addEventListener("click", () => {
    display.value = "";
    num1 = "";
    num2 = "";
    op = "";
});

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "/":
            return divide(num1, num2);
        case "x": 
            return multiply(num1, num2);
    }
}