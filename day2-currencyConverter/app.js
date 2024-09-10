import { codes, exchanges, base } from "./data.js";

const list = document.getElementById("countries");
const search = document.getElementById("search");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const openModalBtns = document.querySelectorAll(".fa-arrow-right");
const modal = document.querySelector(".modal");

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

input1.focus();

let inputOnFocus = input1;
let inputNotOnFocus = input2;

input1.addEventListener("focus", () => {
  inputOnFocus = input1;
  inputNotOnFocus = input2;
});

input2.addEventListener("focus", () => {
  inputOnFocus = input2;
  inputNotOnFocus = input1;
});

input1.addEventListener("input", (e) => {
  if (/\D/gim.test(e.target.value)) {
    e.target.value = e.target.value.slice(0, e.target.value.length - 1);
  }
  if(input1.value) {
    input2.value = calculateExchange(input1.value,input2.value,input1.placeholder,input2.placeholder)
  }

});

input2.addEventListener("input", (e) => {
  if (/\D/gim.test(e.target.value)) {
    e.target.value = e.target.value.slice(0, e.target.value.length - 1);
  }
  if(input2.value) {
    input1.value = calculateExchange(input2.value,input1.value,input2.placeholder,input1.placeholder)
  }
});

for (const key in codes) {
  list.innerHTML += `<h2 class="country">${codes[key]} <span class="currSpan">${key}</span></h2>`;
}

search.addEventListener("input", (e) => {
  const valueInput = e.target.value;
  const filtered = Object.keys(codes).filter((key) => {
    if (codes[key].toLowerCase().includes(valueInput.trim().toLowerCase())) {
      return key;
    }
  });

  list.innerHTML = "";
  filtered.forEach((key) => {
    list.innerHTML += `<h2 class="country">${codes[key]} <span class="currSpan">${key}</span></h2>`;
    document.querySelectorAll(".country").forEach((country) => {
      country.addEventListener("click", () => {
        let x;
        let y;
        if (inputOnFocus.id === "input1") {
          x = "forInput1h4";
          y = "forInput2h4";
        } else {
          x = "forInput2h4";
          y = "forInput1h4";
        }
        document.getElementById(x).innerHTML = `${
          codes[country.querySelector(".currSpan").innerText]
        } <span class="currSpan">${
          country.querySelector(".currSpan").innerText
        }</span>`;
        inputNotOnFocus.placeholder =
          exchanges[
            document.querySelector(`#${y}`).querySelector(".currSpan").innerText
          ] / exchanges[country.querySelector(".currSpan").innerText];
        inputOnFocus.placeholder = "1";
        modal.style.scale = "0";
      });
    });
  });
});

numberBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!operation) {
      inputOnFocus.value += e.target.innerText;
    } else if (operation === "mul") {
      inputOnFocus.value += e.target.innerText;
      inputOnFocus.value =
        Number(inputOnFocus.value.slice(0, inputOnFocus.value.length - 1)) *
        Number(inputOnFocus.value.slice(-1));
      operation = null;
    } else if (operation === "divide") {
      inputOnFocus.value += e.target.innerText;
      inputOnFocus.value =
        Number(inputOnFocus.value.slice(0, inputOnFocus.value.length - 1)) /
        Number(inputOnFocus.value.slice(-1));
      operation = null;
    } else if (operation === "add") {
      inputOnFocus.value += e.target.innerText;
      inputOnFocus.value =
        Number(inputOnFocus.value.slice(0, inputOnFocus.value.length - 1)) +
        Number(inputOnFocus.value.slice(-1));
      operation = null;
    } else if (operation === "subtract") {
      inputOnFocus.value += e.target.innerText;
      inputOnFocus.value =
        Number(inputOnFocus.value.slice(0, inputOnFocus.value.length - 1)) -
        Number(inputOnFocus.value.slice(-1));
      operation = null;
    } else if (operation === "add") {
      inputOnFocus.value += e.target.innerText;
      inputOnFocus.value =
        Number(inputOnFocus.value.slice(0, inputOnFocus.value.length - 1)) +
        Number(inputOnFocus.value.slice(-1));
      operation = null;
    }

    inputNotOnFocus.value = calculateExchange(inputOnFocus.value);
  });
});

let operation = null;

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const operatorSelected = e.target.dataset.operation;
    console.log(operatorSelected);
    switch (operatorSelected) {
      case "ac":
        inputOnFocus.value = "";
        break;

      case "delete":
        inputOnFocus.value = inputOnFocus.value.slice(
          0,
          inputOnFocus.value.length - 1
        );
        break;

      case "mul":
        operation = "mul";
        break;

      case "divide":
        operation = "divide";
        break;

      case "add":
        operation = "add";
        break;

      case "subtract":
        operation = "subtract";
        break;
    }
  });
});

function calculateExchange(numberOnfoucus, numberNotOnFocus,inputOnFocusPlaceholder,inputNotOnFocusPlaceholder) {
  if(!inputOnFocus.value) return 
  return inputNotOnFocus.value = (
    numberOnfoucus * inputNotOnFocusPlaceholder / inputOnFocusPlaceholder
  )
}


openModalBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.id === "forInput1") {
      inputOnFocus = document.getElementById("input1");
      inputNotOnFocus = document.getElementById("input2");
    } else {
      inputOnFocus = document.getElementById("input2");
      inputNotOnFocus = document.getElementById("input1");
    }

    modal.style.scale = "1";
    document.getElementById("close").addEventListener("click", () => {
      modal.style.scale = "0";
    });
    document.querySelectorAll(".country").forEach((country) => {
      country.addEventListener("click", () => {
        let x;
        let y;
        if (inputOnFocus.id === "input1") {
          x = "forInput1h4";
          y = "forInput2h4";
        } else {
          x = "forInput2h4";
          y = "forInput1h4";
        }
        document.getElementById(x).innerHTML = `${
          codes[country.querySelector(".currSpan").innerText]
        } <span class="currSpan">${
          country.querySelector(".currSpan").innerText
        }</span>`;
        inputNotOnFocus.placeholder =
          exchanges[
            document.querySelector(`#${y}`).querySelector(".currSpan").innerText
          ] / exchanges[country.querySelector(".currSpan").innerText];
        inputOnFocus.placeholder = "1";
        calculateExchange(inputOnFocus.value, inputNotOnFocus.value,inputOnFocus.placeholder,inputNotOnFocus.placeholder);
        modal.style.scale = "0";
      });
    });
  });
});

