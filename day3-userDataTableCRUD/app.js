const modal = document.querySelector(".modal");
const tbody = document.querySelector("tbody");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const emailInput = document.querySelector("#email");
const submitBtn = document.querySelector("#submit");
const updateBtnMain = document.getElementById("updateRowMain");
const deleteBtn = document.querySelector("#delete");
const update = document.querySelector("#update");
const table = document.querySelector("table");

ageInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;

  if (name.trim() === "" || age.trim() === "" || email.trim() === "") {
    document.querySelectorAll("input").forEach((input) => {
      input.style.color = "red";
    });
    nameInput.value = "please enter the name";
    ageInput.value = "please enter the age";
    emailInput.value = "please enter the email";
    setTimeout(() => {
      nameInput.value = "";
      ageInput.value = "";
      emailInput.value = "";
      document.querySelectorAll("input").forEach((input) => {
        input.style.color = "white";
      });
    }, 2000);
    return;
  }

  if (!/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{3,6}/g.test(email)) {
    emailInput.style.color = "red";
    emailInput.value = "please enter a valid email";
    setTimeout(() => {
      emailInput.value = "";
      emailInput.style.color = "#ffffff";
    }, 2000);
    return;
  }

  const row = tbody.insertRow(tbody.rows.length);
  row.insertCell(0).innerText = name;
  row.insertCell(1).innerText = age;
  row.insertCell(2).innerText = email;
  row.insertCell(
    3
  ).innerHTML = `<button id="deleteRow">Delete</button> <button id="updateRow">Update</button>`;

  row.addEventListener("click", (e) => {
    selectedRowIndex =
      (e.target.parentElement.rowIndex
        ? e.target.parentElement.rowIndex
        : e.target.parentElement.parentElement.rowIndex) - 1;
    nameInput.value = tbody.rows[selectedRowIndex].cells[0].innerText;
    ageInput.value = tbody.rows[selectedRowIndex].cells[1].innerText;
    emailInput.value = tbody.rows[selectedRowIndex].cells[2].innerText;
    console.log(selectedRowIndex);
  });

  document.querySelectorAll("#deleteRow").forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add("active");
    });
  });

  document.querySelectorAll("#updateRow").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitBtn.style.scale = 0;
      updateBtnMain.style.scale = 1;
      updateBtnMain.addEventListener("click", (e) => {
        e.preventDefault();
        if (
          !(
            nameInput.value.trim() === "" ||
            ageInput.value.trim() === "" ||
            emailInput.value.trim() === ""
          )
        ) {
          tbody.rows[selectedRowIndex].cells[0].innerText = nameInput.value;
          tbody.rows[selectedRowIndex].cells[1].innerText = ageInput.value;
          tbody.rows[selectedRowIndex].cells[2].innerText = emailInput.value;
          updateBtnMain.style.scale = 0;
          submitBtn.style.scale = 1;
        }
      });
    });
  });

  nameInput.value = "";
  ageInput.value = "";
  emailInput.value = "";
});

let selectedRowIndex;

const deleteConfirm = document
  .getElementById("deleteConfirm")
  .addEventListener("click", () => {
    console.log(selectedRowIndex);
    modal.classList.remove("active");
    nameInput.value = "";
    emailInput.value = "";
    ageInput.value = "";
    tbody.deleteRow(selectedRowIndex);
  });

const deleteCancel = document
  .getElementById("deleteCancel")
  .addEventListener("click", () => {
    modal.classList.remove("active");
  });
