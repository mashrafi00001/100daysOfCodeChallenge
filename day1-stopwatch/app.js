const pausePlay = document.querySelector(".pause-play");
const reset = document.querySelector(".reset");
const text = document.querySelector("#textToRender");
const i = document.querySelector(".fa-play");

pausePlay.addEventListener("click", (e) => {
  e.preventDefault();
  if (i.classList.contains("fa-play")) {
    i.classList.replace("fa-play", "fa-pause");
    id = setInterval(startCount, 950);
    clearInterval(id2);
    text.style.display = "block";
  } else {
    i.classList.replace("fa-pause", "fa-play");
    clearInterval(id);
    id2 = setInterval(() => {
      text.style.display === "none"
        ? (text.style.display = "block")
        : (text.style.display = "none");
    }, 300);
  }
});

let id2;

reset.addEventListener("click", (e) => {
  e.preventDefault();
  clearInterval(id);
  clearInterval(id2);
  seconds = 0;
  text.innerText = "00:00:00";
  i.classList.replace("fa-pause", "fa-play");
});

let id;
let seconds = 0;

function startCount(stop = false) {
  if (stop) clearInterval(id);
  seconds++;
  render(seconds);
}

function render(seconds) {
  const ss = (seconds % 60) % 60;
  const mm = Math.floor((seconds / 60) % 60);
  const hh = Math.floor(seconds / 60 / 60);
  text.innerText = `${hh.toString().padStart(2, "0")}:${mm
    .toString()
    .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
}
