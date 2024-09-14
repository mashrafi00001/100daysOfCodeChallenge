const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789";
const symbol = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
const lowerCase = upperCase.toLowerCase();

const generateBtn = document.querySelector("#generate");
const len = document.querySelector("#len");
const range = document.querySelector("#length");
const upperCheck = document.querySelector("#uppercase");
const lowerCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const password = document.querySelector("#password");
const copy = document.querySelector("#copy");

let passwordString = "";

generateBtn.addEventListener("click", () => {
    passwordString = "";
    if(upperCheck.checked){
        passwordString += upperCase;
    }
    if(lowerCheck.checked){
        passwordString += lowerCase;
    }

    if(numberCheck.checked){
        passwordString += number;
    }

    if(symbolCheck.checked){    
        passwordString += symbol;
    }

    generatePassword();
})

range.addEventListener("input", () => {
    len.innerText = range.value;
})

function generatePassword() {
    let passwordLength = range.value;
    password.value = "";
    for(let i = 0;i < passwordLength;i++){
        let randomIndex = Math.floor(Math.random() * passwordString.length)
        password.value += passwordString.charAt(randomIndex);
    }
}

copy.addEventListener("click",()=>{
    if(password.value.trim()){
        navigator.clipboard.writeText(password.value);
        copy.innerText = "Copied";
        setTimeout(()=>{
            copy.innerText = "";
        },1000)
    }
})