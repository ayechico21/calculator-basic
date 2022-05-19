const screen = document.getElementsByClassName("calc-screen")[0];
let buffer = "0";
let previousOperator = undefined;
let total = 0;

function getOperation(button) {
  if (isNaN(button)) {
    handleOperator(button);
  } else {
    handleNumber(button);
  }
  rerender(buffer);
}

function handleNumber(button) {
  if (buffer === "0") {
    buffer = button;
  } else {
    buffer += button;
  }
}

function handleOperator(button) {
  if (button === "C") {
    buffer = "0";
  } else if (button === "←") {
    if (buffer.length === 1) {
      buffer = "0";
    } else {
      buffer = buffer.substring(0, buffer.length - 1);
    }
  } else if(button === "="){
    if(previousOperator === undefined) return;
    doMath();
    previousOperator = undefined;
    buffer = "" + total;
    total = 0;
  }
  else{
      handleMath(button);
  }
}

function handleMath(button){
    if(buffer === "0") return;
    if(total === 0){
        total = parseInt(buffer);
    }
    else{
        doMath();
    }
    previousOperator = button;
    buffer = "0";
}

function doMath() {
    intBuffer = parseInt(buffer);
    if(previousOperator === "+") total += intBuffer;
    else if(previousOperator === "-") total -= intBuffer;
    else if(previousOperator === "*") total *= intBuffer;
    else if(previousOperator === "/") total /= intBuffer;
}

function rerender(buffer) {
  screen.innerText = buffer;
}

function main() {
  document.querySelector(".calc").addEventListener("click", function (event) {
    getOperation(event.target.innerText);
    console.log(buffer);
  });
}

main();
