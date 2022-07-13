const mainDisplay = document.querySelector('#mainDisplay');
const auxDisplay = document.querySelector('#auxDisplay');
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', inputData)
buttons.forEach(button => button.addEventListener('click', inputData))

mainDisplay.textContent = '0';
auxDisplay.textContent = '';

function inputData(e) {
    // accept valid inputs
    let inputValue;
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
                mainDisplay.textContent = '0';
                break;
            case 'equal':
                operate(operator,a,b);
                break;
            case 'pm':
                mainDisplay.textContent = '-'+mainDisplay.textContent
        }

    }
}

function numberInput(inputValue) {
    // check input validity
    if (mainDisplay.textContent == '0' && /[0\*\+\-\/\^]/.test(inputValue)) {
        return;
    }
    else if (mainDisplay.textContent.includes('.') && /[\.]/.test(inputValue)) {
        return;
    }
    else if (/[1-9\.]/.test(inputValue)) {
        if (mainDisplay.textContent == '0') {
            mainDisplay.textContent = '';
        }
        mainDisplay.textContent += inputValue;
    }
}

function operatorInput(inputValue) {
    if (/^[\+\-]?[0-9]+\.?[0-9]*$/.test(mainDisplay.textcontent)) {
        if (auxDisplay == '') {
            auxDisplay.textContent = mainDisplay.textContent;
            auxDisplay.textContent += ` ${inputValue}`
        }
        else 

    } 
}

function operate(aux, main) {
    let operator = aux.match(/[\*\+\-\/\^]/);
    let a = aux.match(/[\+\-]?[0-9]+\.?[0-9]/);
    let b = main
    switch (operator) {
        case '+':
            add(a,b);
        case '-':
            substract(a,b);
        case '*':
            multiply(a,b);
        case '/':
            divide(a,b);
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



