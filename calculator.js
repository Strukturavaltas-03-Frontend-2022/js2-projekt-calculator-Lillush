"use strict";

const numButtons = document.querySelectorAll(".num__buttons");
const output = document.querySelector(".output");
const operators = document.querySelectorAll(".top__buttons");
const clearBtn = document.querySelector(".clear");
const dotBtn = document.querySelector(".dot");
const sumBtn = document.querySelector(".sum__button");

let calcedNums = 0;

numButtons.forEach((number, i) =>
  number.addEventListener("click", () => {
    output.innerHTML += number.innerHTML;
    operators.forEach((sign) => sign.removeAttribute("disabled"));
  })
);

operators.forEach((sign, i) => {
  sign.setAttribute("disabled", true);
  sign.addEventListener("click", () => {
    output.innerHTML += ` ${sign.innerHTML} `;
    operators.forEach((sign) => sign.setAttribute("disabled", false));
  });
});

clearBtn.addEventListener("click", () => {
  output.innerHTML = "";
});

dotBtn.addEventListener("click", () => {
  output.innerHTML += dotBtn.innerHTML;
});

const calculate = () => {
  const calcArr = output.innerHTML.split(" ");
  while (calcArr.length > 2) {
    let num1 = Number(calcArr[0]);
    let operand = calcArr[1];
    let num2 = Number(calcArr[2]);

    switch (operand) {
      case "+":
        calcedNums = num1 + num2;
        break;
      case "-":
        calcedNums = num1 - num2;
        break;
      case "x":
        calcedNums = num1 * num2;
        break;
      case "÷":
        calcedNums = num1 / num2;
        break;
    }

    for (let i = 0; i < 3; i++) {
      calcArr.shift();
    }
    calcArr.unshift(calcedNums);
  }

  if (
    !Number.isNaN(calcArr[0]) &&
    Number.isSafeInteger(calcArr[0]) &&
    Number.isFinite(calcArr[0])
  ) {
    output.innerHTML = calcArr[0];
  } else {
    output.innerHTML = "ERROR";
  }
};

sumBtn.addEventListener("click", calculate);
