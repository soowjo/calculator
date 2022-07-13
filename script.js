const mainDisplay = document.querySelector('#mainDisplay');
const auxDisplay = document.querySelector('#auxDisplay');
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', inputData)
buttons.forEach(button => button.addEventListener('click', inputData))

let inputValue;
reset();

function reset() {
    mainDisplay.textContent = '0';
    auxDisplay.textContent = '';
    inputValue = '';
}

function inputData(e) {
    if (inputValue == 'equal' || inputValue == 'Enter') {
        reset();
    }
    if (/\d|[\.]/.test(this.id)) {
        inputValue = this.id;
        numberInput(inputValue);
    }
    else if (/\d|[\.]/.test(e.key)) {
        inputValue = e.key;
        numberInput(inputValue);
    }
    else if (/[\*\+\-\/\^]/.test(this.id)) {
        inputValue = this.id;
        operatorInput(inputValue);
    }
    else if (/[\*\+\-\/\^]/.test(e.key)) {
        inputValue = e.key;
        operatorInput(inputValue);
    }
    else {
        switch (this.id) {
            case 'back':
                mainDisplay.textContent = mainDisplay.textContent.slice(0,-1);
                if (mainDisplay.textContent == '') {
                    mainDisplay.textContent = '0';
                }
                break;
            case 'clear':
                reset();
                break;
            case 'equal':
                mainDisplay.textContent = operate(auxDisplay, mainDisplay);
                auxDisplay.textContent = '';
                inputValue = this.id;
                break;
            case 'sign':
                if (mainDisplay.textContent == '0') {
                    mainDisplay.textContent = '-';
                }
                else if (mainDisplay.textContent == '-') {
                    mainDisplay.textContent = '0';
                }
                else if (mainDisplay.textContent[0] == '-') {
                    mainDisplay.textContent = mainDisplay.textContent.slice(1);
                }
                else {
                    mainDisplay.textContent = '-'+mainDisplay.textContent;
                }
                break;
        }
        switch (e.key) {
            case 'Backspace':
                mainDisplay.textContent = mainDisplay.textContent.slice(0,-1);
                if (mainDisplay.textContent == '') {
                    mainDisplay.textContent = '0';
                }
                break;
            case 'Enter':
                operate(auxDisplay, mainDisplay);
                inputValue = e.key;
                break;
        }
    }
}

function numberInput(inputValue) {
    if (mainDisplay.textContent == '0' && /[0\*\+\-\/\^]/.test(inputValue)) {
        return;
    }
    else if (mainDisplay.textContent.includes('.') && /[\.]/.test(inputValue)) {
        return;
    }
    else if (/[0-9\.]/.test(inputValue)) {
        if (mainDisplay.textContent == '0') {
            mainDisplay.textContent = '';
        }
        mainDisplay.textContent += inputValue;
    }
}

function operatorInput(inputValue) {
    if (/^[\+\-]?[0-9]+\.?[0-9]*$/.test(mainDisplay.textContent)) {
        if (auxDisplay.textContent == '') {
            auxDisplay.textContent = mainDisplay.textContent;
        }
        else if ((/[\+\-]?[0-9]+\.?[0-9]*\s[\*\+\-\/\^]/).test(auxDisplay.textContent)) {
            auxDisplay.textContent = operate(auxDisplay, mainDisplay)
        }
        auxDisplay.textContent += ` ${inputValue}`;
        mainDisplay.textContent = '0';
    } 
}

function operate(aux, main) {
    let operator = aux.textContent.match(/[\*\+\-\/\^]/)[0];
    let a = parseFloat(aux.textContent.match(/[\+\-]?[0-9]+\.?[0-9]*/)[0]);
    let b = parseFloat(main.textContent)
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return substract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        case '^':
            return exponentiate(a,b);
    }
}

function add(a,b) {
    return a+b;
};
  
function substract(a,b) {
    return a-b;
};

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function exponentiate(a,b) {
    return a**b;
}