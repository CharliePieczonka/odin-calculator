let num1 = "";
let num2 = "";
let op = "";
let chain = false;

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equals = document.querySelector("#equals");
let display = document.querySelector("#display");
let clear = document.querySelector("#clear");

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if(display.value == "Error") {
            return;
        }

        if(op == "") {
            // chain is set when the calc hasn't been cleared from the previous operation
            // if numbers are typed after the answer is displayed, set num1 and set chain false
            if(chain) {
                num1 = number.textContent;
                display.value = num1;
                chain = false;
            }
            else {
                // if operator is blank, add the digit into the display space for num1
                num1 += number.textContent;
                display.value = num1;
            }
            
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
        // if the user hits the next operator before equals then perform the calculation
        if(op != "" && num2 != "") {
            equate();
        }

        op = operator.textContent;
    });
});

equals.addEventListener("click", () => {
    equate();
});

clear.addEventListener("click", () => {
    display.value = "";
    num1 = "";
    num2 = "";
    op = "";
    chain = false;
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
    
    if(operator == "" && !isNaN(num1)){
        return num1;
    }

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

function equate() {
    let ans = operate(op, parseFloat(num1),  parseFloat(num2));

    if(isNaN(ans)) {
        display.value = "Error";
    }
    else {
        ans = +ans.toFixed(10); //round to 10 decimals, + removes trailing 0s
        ans = ans.toString().slice(0, 11); // limit entire number to 11 characters to fit display
        display.value = ans;
        num1 = ans;
        num2 = "";
        op = "";
        chain = true;
    }
}