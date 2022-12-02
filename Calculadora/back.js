let numberArea = document.querySelector("#windowNumber");
/*NUMBERS*/

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

/*Signos de operacion */
let letterC = document.querySelector("#letterC");
let letterCE = document.querySelector("#letterCE");
let plusMinus = document.querySelector("#plusMinus");
let porcentage = document.querySelector("#porcentage");
let divide = document.querySelector("#divide");
let multiplication = document.querySelector("#multiplication");
let subtract = document.querySelector("#subtract");
let plus = document.querySelector("#plus");

/*Clases*/
let equal = document.querySelector("#equal");
let point = document.querySelector("#decimal");

/* Window */
let operation = document.querySelector("#operation");
let history = document.querySelector("#history");
let result = document.querySelector("#result");

/*  HISTORY */
let historyObject = [];
let historyOn = null;

/* RESULT */
let counterResult = 0;
let calculoResult = "";

/*Calculo*/
let calculo = ""; //primer numero;

let container = document.querySelector(".mainBody");

const allNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/']

container.addEventListener("click", numeros);
/*calculo = allNumbers.addEventListener("click");*/

function numeros(event) {
  const value = event.target.textContent;
  if (allNumbers.includes(value)) {
    if (historyOn === 1) {
      showOperationResultScreen();
    }
    calculo += value;
    operation.innerText = calculo;
  }
}
let log = document.querySelector("#log");
log.addEventListener('click', showHistoryScreen);

function showHistoryScreen() {
  /* Tecla "Log":
  Identifica history, operation y result en HTML. Esconde
  operation y result, y muestra el historial.*/
  let history = document.querySelector("#history");
  let operation = document.querySelector("#operation");
  let result = document.querySelector("#result");

  numberArea.style.gridTemplateRows = "100% 0% 0%";
  numberArea.style.padding = "1rem auto";
  /* numberArea.style.width = "90%"; */
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
  let history = document.querySelector("#history");
  let operation = document.querySelector("#operation");
  let result = document.querySelector("#result");

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
  if (calculoResult!==undefined){ 
    historyObject.push(calculo + " = " + calculoResult);
  } 
}


let counterHistoryArray = 0;
function printHistory() {
  for (let i = counterHistoryArray; i < historyObject.length; i++) { 
      let paragraph = document.createElement("p");
      history.appendChild(paragraph);
      paragraph.innerText = historyObject[i];
      counterHistoryArray++;
    }
}


equal.addEventListener("click", createResult)

function createResult() {
  if (historyOn === 1) {
    showOperationResultScreen();
    return;
  }
  
  calculoResult = eval(calculo);
  if (calculoResult == "") {
    result.innerText = calculoResult;
  } else {
    result.innerText = getFormattedNumber(calculoResult);
  }
  saveHistory(calculo, calculoResult);
}


equal.addEventListener("dblclick", showResultUp);

function showResultUp() {
  operation.innerText = calculoResult;
  calculo = calculoResult;
  result.innerText = " ";
  /* Cuando se da dos veces al = se suman dos 
  veces   
  extras la operación al array. Así lo eliminamos 
  */
  historyObject.pop();
  historyObject.pop();
}


letterC.addEventListener("click", clearAll)

function clearAll() {
  if (historyOn === 1) {
    showOperationResultScreen();
  }

  calculo = "";
  operation.innerText = calculo;
  result.innerText = calculo;
}

porcentage.addEventListener("click", porcentaje)

function porcentaje() {
  if (historyOn === 1) {
    showOperationResultScreen();
  }
  calculo += "%";
  console.log(calculo);
  operation.innerText = calculo;
}

plusMinus.addEventListener("click", menosPlus)

function menosPlus() {
let calculoArray = calculo.split('');
console.log(calculoArray);
  for(let i=calculoArray.length; i>=0; i--){ 
    if (calculoArray[i] === "-"){ 
      calculoArray[i] = "+";
      break;
    }
    else if (calculoArray[i] === "+"){ 
      calculoArray[i] = "-";
      break;
    }
  }
  calculo = calculoArray.join('');
  operation.innerText = calculo;
  console.log(calculo);
}

letterCE.addEventListener("click", deleteLastElementOnScreenCE)

function deleteLastElementOnScreenCE() {
  let calculoArray = calculo.split('');
  calculoArray.pop(); 
  calculo = calculoArray.join('');
  operation.innerText = calculo;
}
/* noche */
let nightMood = document.querySelector("#buttonNightMode");
nightMood.addEventListener("click", night)

function night() {
  /* darkoperator */
  const mainBody = document.querySelector(".mainBody")
  mainBody.classList.toggle("dark")
  const teclaPlusMinus = document.getElementById("plusMinus")
  teclaPlusMinus.classList.toggle("dark")
  const teclaporcentage = document.getElementById("porcentage")
  teclaporcentage.classList.toggle("dark")
  const tecladivide = document.getElementById("divide")
  tecladivide.classList.toggle("dark")
  const teclamultiplication = document.getElementById("multiplication")
  teclamultiplication.classList.toggle("dark")
  const teclasubtract = document.getElementById("subtract")
  teclasubtract.classList.toggle("dark")
  const teclaplus = document.getElementById("plus")
  teclaplus.classList.toggle("dark")
  const teclaequal = document.getElementById("equal")
  teclaequal.classList.toggle("dark")
  /* darknums */
  const teclanum7 = document.getElementById("num7")
  teclanum7.classList.toggle("dark")
  const teclanum8 = document.getElementById("num8")
  teclanum8.classList.toggle("dark")
  const teclanum9 = document.getElementById("num9")
  teclanum9.classList.toggle("dark")
  const teclanum4 = document.getElementById("num4")
  teclanum4.classList.toggle("dark")
  const teclanum5 = document.getElementById("num5")
  teclanum5.classList.toggle("dark")
  const teclanum6 = document.getElementById("num6")
  teclanum6.classList.toggle("dark")
  const teclanum1 = document.getElementById("num1")
  teclanum1.classList.toggle("dark")
  const teclanum2 = document.getElementById("num2")
  teclanum2.classList.toggle("dark")
  const teclanum3 = document.getElementById("num3")
  teclanum3.classList.toggle("dark")
  const teclanum0 = document.getElementById("num0")
  teclanum0.classList.toggle("dark")
  const tecladecimal = document.getElementById("decimal")
  tecladecimal.classList.toggle("dark")
  const teclalog = document.getElementById("log")
  teclalog.classList.toggle("dark")
  /* Ventana y fondo */
  const window = document.getElementById("windowNumber")
  window.classList.toggle("dark")
  const maderas = document.querySelector(".madera")
  maderas.classList.toggle("dark")
  const buttonDark = document.getElementById("buttonNightMode")
  buttonDark.classList.toggle("dark")
  letterC.classList.toggle("dark")
  letterCE.classList.toggle("dark")
  const casioVintageLet = document.querySelector(".casio")
  casioVintageLet.classList.toggle("dark")
}
/* Las lineas del Log se solapan con el salto de linea.
Quizas por el line height.
Tras darle al Log si le damos al igual aparece NaN.
Solucionar. Si no se guarda undefined.
Botón night mode.
Con numeros muy grandes el historial se bloquea.
*/