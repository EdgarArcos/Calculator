let numberArea = document.querySelector("#windowNumber");
let numberZero = document.querySelector("#num0");
let numberOne = document.querySelector("#num1");
let numberTwo = document.querySelector("#num2");
let numberThree = document.querySelector("#num3");
let numberFour = document.querySelector("#num4");
let numberFive = document.querySelector("#num5");
let numberSix = document.querySelector("#num6");
let numberSeven = document.querySelector("#num7");
let numberEight = document.querySelector("#num8");
let numberNine = document.querySelector("#num9");
let letterC = document.querySelector("#letterC");
let letterCE = document.querySelector("#letterCE");
let plusMinus = document.querySelector("#plusMinus");
let porcentage = document.querySelector("#porcentage");
let divide = document.querySelector("#divide");
let multiplication = document.querySelector("#multiplication");
let subtract = document.querySelector("#subtract");
let plus = document.querySelector("#plus");
let equal = document.querySelector("#equal");
let point = document.querySelector("#decimal");
let operation = document.querySelector("#operation");
let history = document.querySelector("#history");
let result = document.querySelector("#result");
let container = document.querySelector(".mainBody");
let log = document.querySelector("#log");
let historyObject = [];
let historyOn = null;
let counterResult = 0;
let calculoResult = "";
let clickOnEqual = 0;
let calculo = "";
let calculoArray = [];
let lengthCalculoArray = null;
let arrayWithAllTheNumerandos = [];
let arrayOperators = [];
let counterHistoryArray = 0;
let blockTheWay = 0;
let calculations = null;
let firstNumberOfString = null;
let secondNumberOfString = null;
const teclaPlusMinus = document.getElementById("plusMinus")
const mainBody = document.querySelector(".mainBody")
const teclaporcentage = document.getElementById("porcentage")
const tecladivide = document.getElementById("divide")
const teclamultiplication = document.getElementById("multiplication")
const teclasubtract = document.getElementById("subtract")
const teclaplus = document.getElementById("plus")
const teclaequal = document.getElementById("equal")
const teclanum7 = document.getElementById("num7")
const teclanum8 = document.getElementById("num8")
const teclanum9 = document.getElementById("num9")
const teclanum4 = document.getElementById("num4")
const teclanum5 = document.getElementById("num5")
const teclanum6 = document.getElementById("num6")
const teclanum1 = document.getElementById("num1")
const teclanum2 = document.getElementById("num2")
const teclanum3 = document.getElementById("num3")
const teclanum0 = document.getElementById("num0")
const tecladecimal = document.getElementById("decimal")
const teclalog = document.getElementById("log")
const maderas = document.querySelector(".madera")
const buttonDark = document.getElementById("buttonNightMode")
const casioVintageLet = document.querySelector(".casio")
let nightMood = document.querySelector("#buttonNightMode");
const allKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '%'];
const allNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const allOperators = ['+', '-', '*', '/', '%'];

container.addEventListener("click", clickOnNumbersAndOperators);
equal.addEventListener("click", calculationsWithoutEval);
log.addEventListener('click', showHistoryScreen);
plusMinus.addEventListener("click", menosPlus)
letterCE.addEventListener("click", deleteLastElementOnScreenCE)
letterC.addEventListener("click", clearAll)
nightMood.addEventListener("click", night)
history.addEventListener("click", clickOnHistoryAndDisplayOnOperator);

function clickOnHistoryAndDisplayOnOperator(event) {
  const value = event.target.textContent;
  calculoArray = value.split('');
  let indexToSplit = calculoArray.indexOf('=');
  let operationsArray = calculoArray.slice(0, indexToSplit - 1);
  let resultArray = calculoArray.slice(indexToSplit + 1);
  resultArray.splice(0, 1);
  calculo = operationsArray.join('');
  calculoResult = resultArray.join('');
  operation.innerHTML = calculo;
  result.innerHTML = getFormattedNumber(calculoResult);
  showOperationResultScreen();
  /* console.log({ calculoResult, calculo }); */
}

function clickOnNumbersAndOperators(event) {
  const value = event.target.textContent;
  if (allKeys.includes(value)) {
    clickOnEqual = 0;
    if (historyOn === 1) {
      showOperationResultScreen();
    }
    calculo += value;
  }
  calculoArray = calculo.split('');

  addCeroBeforeDecimal();
  avoidMultipleSameSignsTogether();

  calculo = calculoArray.join('');
  operation.innerText = calculo;
}

function addCeroBeforeDecimal() {
  let i = 0;
  if (calculoArray[0] == ".") {
    calculoArray.unshift("0");
    i++;
  }
  for (i; i < calculoArray.length; i++) {
    if (calculoArray[i] == "." && !allNumbers.includes(calculoArray[i - 1])) {
      calculoArray.splice(i, 0, '0');
    }
  }
}

function avoidMultipleSameSignsTogether() {
  for (let i = 0; i < calculoArray.length; i++) {
    if (allOperators.includes(calculoArray[i]) && allOperators.includes(calculoArray[i - 1]) || calculoArray[i] == "." && calculoArray[i-1] == ".") {
      calculoArray.splice(i, 1);
      i--;
    }
  }
}

function showHistoryScreen() {
  numberArea.style.gridTemplateRows = "100% 0% 0%";
  numberArea.style.padding = "1rem auto";
  operation.style.visibility = "hidden";
  result.style.visibility = "hidden";
  history.style.visibility = "visible";
  numberArea.style.overflow = "hidden";
  printHistory();
  calculo = "";
  calculoResult = "";
  operation.innerText = calculo;
  result.innerText = calculoResult;
  historyOn = 1;
}

function showOperationResultScreen() {
  numberArea.style.gridTemplateRows = "0% auto 30%";
  operation.style.visibility = "visible";
  result.style.visibility = "visible";
  history.style.visibility = "hidden";
  numberArea.style.padding = "1.5rem";
  numberArea.style.width = "86%";
  numberArea.style.overflowX = "hidden";
  numberArea.style.overflowY = "auto";
  historyOn = 0;
}

function getFormattedNumber(num) {
  let n = Number(num);
  let formattedNumber = n.toLocaleString("en");
  return formattedNumber;
}

function saveHistory(calculo, calculoResult) {
  if (calculoResult !== undefined) {
    historyObject.push(calculo + " = " + calculoResult);
  }
}

function printHistory() {
  for (let i = counterHistoryArray; i < historyObject.length; i++) {
    let paragraph = document.createElement("p");
    paragraph.setAttribute('class', 'paragraph');
    history.appendChild(paragraph);
    paragraph.innerText = historyObject[i];
    counterHistoryArray++;
  }
}

function showResultUp() {
  operation.innerText = calculoResult;
  calculo = calculoResult;
  result.innerText = " ";
  historyObject.pop();
  clickOnEqual = 0;
}

function calculationsWithoutEval() {
  if (clickOnEqual == 0) {
    if (historyOn === 1) {
      showOperationResultScreen();
      return;
    }
    blockTheWay = 0;
    arrayWithAllTheNumerandos = [];
    arrayOperators = [];
    saveOperations();

    if (blockTheWay == 0) {
      calculateOperations(arrayWithAllTheNumerandos, arrayOperators);
      if (calculoResult == "") {
        result.innerText = calculoResult;
      } else {
        result.innerText = getFormattedNumber(calculoResult);
      }
      saveHistory(calculo, calculoResult);
    }
    clickOnEqual = 1;
  }
  else if (clickOnEqual == 1) {
    showResultUp();
  }
}

function saveOperations() {
  calculoArray = calculo.split('');
  lengthCalculoArray = calculoArray.length;
  let arrayNumerando = [];
  let twoOrMoreNumbersTogether = 0;
  let counterVariableOperator = 0;
  let i = 0;

  if (calculoArray[0] == "*" || calculoArray[0] == "/" || calculoArray[0] == "%") {
    calculoArray.splice(0, 1);
    dropSignAndReassign();
  }
  if (calculoArray[lengthCalculoArray - 1] == "+" || calculoArray[lengthCalculoArray - 1] == "-" || calculoArray[lengthCalculoArray - 1] == "%" || calculoArray[lengthCalculoArray - 1] == "/" || calculoArray[lengthCalculoArray - 1] == "*") {
    calculoArray.pop();
    dropSignAndReassign();
  }
  if (calculoArray[0] == "+" || calculoArray[0] == "-") {
    i = 1;
    twoOrMoreNumbersTogether++;
    if (calculoArray[0] == "-") {
      arrayNumerando.push(calculoArray[0]);
    }
  }
  for (i; i < lengthCalculoArray; i++) {

    if (allNumbers.includes(calculoArray[i])) {
      if (calculoArray[i] == "." && calculoArray[i + 1] == ".") {
        showError();
        return blockTheWay = 1;
      }
      else if (twoOrMoreNumbersTogether == 0) {
        arrayNumerando = [];
        arrayNumerando.push(calculoArray[i]);
        twoOrMoreNumbersTogether = 1;
      }
      else if (twoOrMoreNumbersTogether == 1) {
        arrayNumerando.push(calculoArray[i]);
      }
    }
    else if (calculoArray[i] == "+" || calculoArray[i] == "-" || calculoArray[i] == "%" || calculoArray[i] == "/" || calculoArray[i] == "*") {

      arrayWithAllTheNumerandos.push(arrayNumerando.join(''));
      twoOrMoreNumbersTogether = 0;
      arrayOperators[counterVariableOperator] = calculoArray[i];
      counterVariableOperator++;
    }
  }
  arrayWithAllTheNumerandos.push(arrayNumerando.join(''));
  return arrayWithAllTheNumerandos;
  return arrayOperators;
}

function dropSignAndReassign() {
  calculo = calculoArray.join('');
  operation.innerText = calculo;
  calculoArray = calculo.split('');
  lengthCalculoArray = calculoArray.length;
}

function calculateOperations(arrayWithAllTheNumerandos, arrayOperators) {
  conditionalMultiplyDivisionModularRest();
  conditionalAddSubtract();

  calculoResult = arrayWithAllTheNumerandos.toString();
}

function conditionalMultiplyDivisionModularRest() {
  for (let i = 0; i < arrayOperators.length; i++) {

    if (arrayOperators[i] === "*" || arrayOperators[i] === "/" || arrayOperators[i] === "%") {
      firstNumberOfString = Number(arrayWithAllTheNumerandos[i]);
      secondNumberOfString = Number(arrayWithAllTheNumerandos[i + 1]);

      if (arrayOperators[i] === "*") {
        calculations = firstNumberOfString * secondNumberOfString;
        i = assignAndSpliceArrays(i);
      }
      else if (arrayOperators[i] === "/") {
        calculations = firstNumberOfString / secondNumberOfString;
        i = assignAndSpliceArrays(i);
      }
      else if (arrayOperators[i] === "%") {
        calculations = firstNumberOfString % secondNumberOfString;
        i = assignAndSpliceArrays(i);
      }
    }
  }
}

function conditionalAddSubtract() {

  for (let i = 0; i < arrayOperators.length; i++) {

    if (arrayOperators[i] === "+" || arrayOperators[i] === "-") {
      firstNumberOfString = Number(arrayWithAllTheNumerandos[i]);
      secondNumberOfString = Number(arrayWithAllTheNumerandos[i + 1]);

      if (arrayOperators[i] === "+") {
        calculations = firstNumberOfString + secondNumberOfString;
        i = assignAndSpliceArrays(i);
      }
      else if (arrayOperators[i] === "-") {
        calculations = firstNumberOfString - secondNumberOfString;
        i = assignAndSpliceArrays(i);
      }
    }
  }
}

function assignAndSpliceArrays(x) {
  arrayWithAllTheNumerandos[x] = calculations.toString();
  arrayWithAllTheNumerandos.splice(x + 1, 1);
  arrayOperators.splice(x, 1);
  return x - 1;
}

function showError() {
  result.innerText = "Error";
}

function clearAll() {
  clickOnEqual = 0;
  if (historyOn === 1) {
    showOperationResultScreen();
  }

  calculo = "";
  operation.innerText = calculo;
  result.innerText = calculo;
}

function menosPlus() {
  clickOnEqual = 0;
  let calculoArray = calculo.split('');
  let onlyNumbers = true;

  for (let i = calculoArray.length; i >= 0; i--) {
    if (allOperators.includes(calculoArray[i])) {
      onlyNumbers = false;
    }
    if (calculoArray[i] === "-") {
      calculoArray[i] = "+";
      break;
    }
    else if (calculoArray[i] === "+") {
      calculoArray[i] = "-";
      break;
    }
  }

  if (onlyNumbers === true) {
    calculoArray.unshift('-');
  }
  calculo = calculoArray.join('');
  operation.innerText = calculo;
}

function deleteLastElementOnScreenCE() {
  clickOnEqual = 0;
  let calculoArray = calculo.split('');
  calculoArray.pop();
  calculo = calculoArray.join('');
  operation.innerText = calculo;
}

function night() {
  mainBody.classList.toggle("dark")
  teclaPlusMinus.classList.toggle("dark")
  teclaporcentage.classList.toggle("dark")
  tecladivide.classList.toggle("dark")
  teclamultiplication.classList.toggle("dark")
  teclasubtract.classList.toggle("dark")
  teclaplus.classList.toggle("dark")
  teclaequal.classList.toggle("dark")
  teclanum7.classList.toggle("dark")
  teclanum8.classList.toggle("dark")
  teclanum9.classList.toggle("dark")
  teclanum4.classList.toggle("dark")
  teclanum5.classList.toggle("dark")
  teclanum6.classList.toggle("dark")
  teclanum1.classList.toggle("dark")
  teclanum2.classList.toggle("dark")
  teclanum3.classList.toggle("dark")
  teclanum0.classList.toggle("dark")
  tecladecimal.classList.toggle("dark")
  teclalog.classList.toggle("dark")
  numberArea.classList.toggle("dark")
  maderas.classList.toggle("dark")
  buttonDark.classList.toggle("dark")
  letterC.classList.toggle("dark")
  letterCE.classList.toggle("dark")
  casioVintageLet.classList.toggle("dark")
  history.classList.toggle("dark")
  operation.classList.toggle("dark")
  result.classList.toggle("dark")
}