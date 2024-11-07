let number1 = "";
let number2 = "";
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

        if(display.value.includes(".") && number.textContent == ".") {
            return;
        }

        if(op == "") {
            // chain is set when the calc hasn't been cleared from the previous operation
            // if numbers are typed after the answer is displayed, set num1 and set chain false
            if(chain) {
                number1 = number.textContent;
                display.value = number1;
                chain = false;
            }
            else if(number1.length < 11) {
                // if operator is blank, add the digit into the display space for num1
                number1 += number.textContent;
                display.value = number1;
            }
            
        }
        else if (number2.length < 11) {
            // if the operator is present, add the digit to num2
            number2 += number.textContent;
            display.value = number2;
        }

        // there was an issue if you clicked clear and then typed the next equation
        // hitting enter would trigger the clear button instead of doing "equals"
        document.activeElement.blur(); 
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        // if the user hits the next operator before equals then perform the calculation
        if(op != "" && number2 != "") {
            operate(op, number1, number2);
        }

        op = operator.textContent;
    });
});

equals.addEventListener("click", () => {
    operate(op, number1, number2);
});

clear.addEventListener("click", () => {
    display.value = "";
    number1 = "";
    number2 = "";
    op = "";
    chain = false;
});

// keyboard support
document.addEventListener("keydown", (event) => {
    if(!isNaN(event.key) || event.key == "+" || event.key == "=" || event.key == "-" || event.key == "/" 
    || event.key == "x" || event.key == "*" || event.key == "Enter" || event.key == "c") {
        
        let key = event.key;
        if(event.key == "Enter") {
            key = "=";
        }

        if (event.key == "*") {
            key = "x";
        }

        if (event.key == "c") {
            key = "C";
        }

        let buttons = [...document.querySelectorAll("button")];
        let button = buttons.find(button => button.textContent == key);
        button.click();
    }
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
    let ans = "";
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if(operator == "" && !isNaN(num1)){
        ans = num1;
    }
    else {
        switch(operator) {
            case "+":
                ans = add(num1, num2);
                break;
            case "-":
                ans = subtract(num1, num2);
                break;
            case "/":
                ans = divide(num1, num2);
                break;
            case "x": 
                ans = multiply(num1, num2);
                break;
        }
    }
    
    if(isNaN(ans)) {
        display.value = "Error";
    }
    else {
        ans = +ans.toFixed(10); //round to 10 decimals, + removes trailing 0s
        ans = ans.toString().slice(0, 11); // limit entire number to 11 characters to fit display
        display.value = ans;
        number1 = ans;
        number2 = "";
        op = "";
        chain = true;
    }
}