const quoteText = document.getElementById("text");
const dice = document.getElementById("dice");
const adviceId = document.getElementById("adviceId");
const pauseplay = document.getElementById("pauseplay");

getAdvice();

dice.addEventListener("click", getAdvice);

async function getAdvice() {
  const data = await fetch("https://api.adviceslip.com/advice");
  const quote = await data.json();
  quoteText.innerText = quote.slip.advice;
  adviceId.innerText = quote.slip.id;
}

let interval = null;
 
pauseplay.addEventListener("click",()=>{
    if(pauseplay.classList.contains("fa-pause")){
        pauseplay.classList.replace("fa-pause","fa-play");
        clearInterval(interval);
    }else{
        pauseplay.classList.replace("fa-play","fa-pause");
        interval = setInterval(getAdvice, 5000);
    }
})

interval = setInterval(getAdvice, 5000)