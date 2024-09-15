const url = "https://restcountries.com/v3.1/all";
const container = document.querySelector(".container");
const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");

let dataArray;

container.innerHTML = "loading...";
container.style.fontSize = "50px";
container.style.fontWeight = "600";
container.style.color = "rgb(103, 103, 103)";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    dataArray = data;
    container.innerHTML = "";
    data.forEach((element, i) => {
      container.innerHTML += `
            <div class="card" id=${i}> 
                <div class="flag">
                    <img src="${element.flags.png}" alt="${element.name.common} Flag" class="flag-img">
                </div>
                <div class="info">
                    <h2 class="name">${element.name.common}</h2>
                    <p class="population">
                        Population: <span>${element.population}</span>
                    </p>
                    <p class="region">
                        Region: <span class="regionSpan">${element.region}</span>
                    </p>
                    <p class="capital">
                        Capital: <span>${element.capital}</span>
                    </p>
                </div>
            </div>`;
    });
    document.querySelectorAll(".card").forEach((card, i) => {
      card.addEventListener("click", () => {
        const description = document.querySelector(".description");
        description.querySelector(".des_name").textContent =
          card.querySelector(".name").textContent;
        description.querySelector(".des_nativeName span").textContent =
          Object.values(dataArray[card.id].name.nativeName)[0].common;
        description.querySelector(".des_flag img").src =
          card.querySelector(".flag-img").src;
        description.querySelector(".des_population span").textContent =
          card.querySelector(".population span").textContent;
        description.querySelector(".des_region span").textContent =
          card.querySelector(".region span").textContent;
        description.querySelector(".des_sub_region span").textContent =
          dataArray[card.id].subregion || "---";
        description.querySelector(".des_capital span").textContent =
          card.querySelector(".capital span").textContent;
        description.querySelector(".des_tld span").textContent =
          dataArray[card.id].tld[0];
        description.querySelector(".des_currencies span").textContent =
          Object.values(...Object.values(dataArray[card.id].currencies));
        description.querySelector(".des_languages span").textContent =
          Object.values(Object.values(dataArray[card.id].languages));
        document.querySelector(".box2").innerHTML = dataArray[card.id].borders?.map((border) => {
            return `<div class="border_country">${border}</div>`;
          })
          .join(" ") || "No Borders";
        description.style.display = "flex";
        container.style.display = "none";
      });
    });
  });

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase().trim().replaceAll(/\s/g, "");

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.display = card
      .querySelector(".name")
      .textContent.toLowerCase()
      .includes(value)
      ? "flex"
      : "none";
  });
});

filter.addEventListener("change", (e) => {
  const value = e.target.value.toLowerCase().trim().replaceAll(/\s/g, "");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.display =
      card.querySelector(".regionSpan").textContent.trim().toLowerCase() ==
      value
        ? "flex"
        : "none";
  });
});


document.querySelector(".description_back-btn").addEventListener("click", () => {
  document.querySelector(".description").style.display = "none";
  container.style.display = "flex";
})

