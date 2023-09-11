// Variáveis globais
let displayValue: string = "0";
let previousValue: number | null = null;
let operator: string | null = null;
let waitingForSecondOperand: boolean = false;
let decimalEntered: boolean = false;

// Elementos DOM
const display = document.getElementById("display") as HTMLSpanElement;
const buttons = document.querySelectorAll(".tecla");

// Função para atualizar o display
function updateDisplay() {
  display.textContent = displayValue;
  previousValue = 0;
}

// Função para adicionar um dígito ao display
function inputDigit(digit: string) {
  if (displayValue.length >= 8) return; // Limite máximo de 8 dígitos

  if (displayValue === "0" || waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue += digit;
  }

  updateDisplay();
}

// Função para adicionar um ponto decimal
function inputDecimal() {
  if (decimalEntered) return; // Evita múltiplos pontos decimais

  if (waitingForSecondOperand || displayValue === "") {
    displayValue = "0.";
  } else {
    displayValue += ".";
  }

  decimalEntered = true;
  updateDisplay();
}

// Função para executar operações
function performOperation(nextOperator: string) {
  const inputValue = parseFloat(displayValue);
  console.log(inputValue)

  // if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    console.log('operator', operator)
  //  return;
  // }

  if (previousValue !== null) {
    switch (operator) {
      case "mas":
        console.log('---', previousValue);
        console.log('---', inputValue);
        console.log('---', operator)
        previousValue += inputValue;
        break;
      case "menos":
        previousValue -= inputValue;
        break;
      case "por":
        previousValue *= inputValue;
        break;
      case "dividido":
        if (inputValue === 0) {
          displayValue = "Error";
          operator = null;
          return;
        }
        previousValue /= inputValue;
        break;
      default:
        previousValue = inputValue;
        break;
    }

    displayValue = previousValue.toString().slice(0, 8);
  } else {
    previousValue = inputValue;
  }

  waitingForSecondOperand = true;
  // operator = nextOperator;
  decimalEntered = false;
  updateDisplay();
}

// Função para calcular a raiz quadrada
function squareRoot() {
  const currentValue = parseFloat(displayValue);

  if (currentValue < 0) {
    displayValue = "Erro";
  } else {
    const result = Math.sqrt(currentValue);
    displayValue = result.toFixed(6);
  }

  updateDisplay();
}

// Função para mudar o sinal do número
function changeSign() {
  const currentValue = parseFloat(displayValue);
  displayValue = (-currentValue).toString();
  updateDisplay();
}

// Configura os event listeners para os botões "raiz" e "signo"
const squareRootButton = document.getElementById("raiz");
if (squareRootButton) {
    squareRootButton.addEventListener("click", () => {
        squareRoot();
    });
}

const changeSignButton = document.getElementById("signo");
if (changeSignButton) {
  changeSignButton.addEventListener("click", () => {
    changeSign();
  });
}

// Adiciona os event listeners aos botões existentes
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.getAttribute("alt");

    if (buttonText === "On") updateDisplay();

    switch (buttonText) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        inputDigit(buttonText);
        break;
      case ".":
        inputDecimal();
        break;
      case "mas":
      case "menos":
      case "por":
      case "dividido":
      case "igual":
        performOperation(buttonText);
        break;
      case "On":
        displayValue = "0";
        break;
    }
  });
});


  




































































