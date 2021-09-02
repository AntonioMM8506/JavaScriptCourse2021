const defaultResult = 0;
let currentResult = defaultResult; 
let logEntries = [];

function getUserNumberInput(){
    return parseInt(userInput.value);
}//End of getUserNumberInput

function createAndWriteOperator(operator, resultBeforeCalc, calcNumber){
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription);
}

function calculateResult(calculationType){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    if(calculationType == 'ADD'){
        currentResult += enteredNumber;
        createAndWriteOperator('+', initialResult, enteredNumber);
    }else if( calculationType == 'SUBSTRACT'){
        currentResult -= enteredNumber;
        createAndWriteOperator('-', initialResult, enteredNumber);
    }else if(calculationType == 'MULTIPLY'){
        currentResult *= enteredNumber;
        createAndWriteOperator('*', initialResult, enteredNumber);
    }else if(calculationType == 'DIVIDE'){
        currentResult /= enteredNumber;
        createAndWriteOperator('/', initialResult, enteredNumber);
    }
    writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}//Calculate result

function writeToLog(operationIdentifier, prevResult, operationNumber, newResult){
    const logEntry = {
        operation: operationIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: newResult
    };

    logEntries.push(logEntry);
    console.log(logEntries);
}//End of writeToLog


function add(){
    calculateResult('ADD');
}//End of add 


function substract(){
    calculateResult('SUBSTRACT');
}//End of substract


function multiply(){
    calculateResult('MULTIPLY');
}//End of multiply


function divide(){
    calculateResult('DIVIDE');
}//End of divide

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', substract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);