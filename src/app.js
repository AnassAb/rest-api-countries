//HTML elements selection
const container = document.getElementById("all");
//Dark Mode
const darkModeBtn = document.getElementById("dark-mode");
const html = document.getElementsByTagName("html")[0];
//Filter elements
const filterBtn = document.getElementById("filter");
const filters = document.getElementById("filter-choices");
const worldBtn = document.getElementById("world");
const africaBtn = document.getElementById("africa");
const asiaBtn = document.getElementById("asia");
const americaBtn = document.getElementById("america");
const europeBtn = document.getElementById("europe");
const oceaniaBtn = document.getElementById("oceania");
//Search elements
var input = document.getElementById("myInput");
//API URL
const api_url = "https://restcountries.com/v3.1/all";

//Show All Countries
getdata(api_url).then((res) => listCountries(res));

//Event Listeners
//Dark Mode
darkModeBtn.addEventListener("click", switchMode);
var para = new URLSearchParams(window.location.search);
var darkMode = para.get("dark-mode");

if (darkMode == "true") {
  switchMode();
}
//Filter
filterBtn.addEventListener("click", showChoices);
worldBtn.addEventListener("click", showAllCountries);
africaBtn.addEventListener("click", showAfricanCountries);
asiaBtn.addEventListener("click", showAsianCountries);
americaBtn.addEventListener("click", showAmericanCountries);
europeBtn.addEventListener("click", showEuropeanCountries);
oceaniaBtn.addEventListener("click", showOceanianCountries);
//Search
input.addEventListener("keyup", searchBarLogic);
//Redirection to details
container.addEventListener("click", function (event) {
  var target = event.target;
  var parent = target.parentNode;
  var bool = html.classList.contains("dark");

  if (target.classList.contains("country")) {
    var index = target.querySelectorAll(".index")[0].textContent;
    var para = new URLSearchParams();
    para.append("country-index", index);
  }

  if (parent.classList.contains("country")) {
    var index = parent.querySelectorAll(".index")[0].textContent;
    var para = new URLSearchParams();
    para.append("country-index", index);
  }

  para.append("dark-mode", bool);
  location.href = "details.html?" + para.toString();
});

//Functions
//Dark Mode
function switchMode() {
  html.classList.toggle("dark");
}
//Filter
function showChoices() {
  filters.classList.toggle("hidden");
}
function showAllCountries() {
  var asianCountries = document.querySelectorAll("#all .asia");
  var africanCountries = document.querySelectorAll("#all .africa");
  var americanCountries = document.querySelectorAll("#all .america");
  var europeanCountries = document.querySelectorAll("#all .europe");
  var oceanianCountries = document.querySelectorAll("#all .oceania");

  for (country of africanCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }

  for (country of asianCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }

  for (country of americanCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }

  for (country of europeanCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }

  for (country of oceanianCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }
}

function hideAllCountries() {
  var asianCountries = document.querySelectorAll("#all .asia");
  var africanCountries = document.querySelectorAll("#all .africa");
  var americanCountries = document.querySelectorAll("#all .america");
  var europeanCountries = document.querySelectorAll("#all .europe");
  var oceanianCountries = document.querySelectorAll("#all .oceania");

  for (country of africanCountries) {
    if (!country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }

  for (country of asianCountries) {
    if (!country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }

  for (country of americanCountries) {
    if (!country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }

  for (country of europeanCountries) {
    if (!country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }

  for (country of oceanianCountries) {
    if (!country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }
}

function showAfricanCountries() {
  hideAllCountries();
  var africanCountries = document.querySelectorAll("#all .africa");
  for (country of africanCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }
}
function showAsianCountries() {
  hideAllCountries();
  var asianCountries = document.querySelectorAll("#all .asia");
  for (country of asianCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }
}
function showAmericanCountries() {
  hideAllCountries();
  var americanCountries = document.querySelectorAll("#all .america");
  for (country of americanCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }
}
function showEuropeanCountries() {
  hideAllCountries();
  var europeanCountries = document.querySelectorAll("#all .europe");
  for (country of europeanCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }
}
function showOceanianCountries() {
  hideAllCountries();
  var oceanianCountries = document.querySelectorAll("#all .oceania");
  for (country of oceanianCountries) {
    if (country.classList.contains("hidden")) {
      country.classList.toggle("hidden");
    }
  }
}

//Search
function searchBarLogic() {
  var filter = input.value.toUpperCase();
  var container = document.getElementById("all");
  var countries = container.querySelectorAll("#all div");

  for (country of countries) {
    var countryName = country.querySelectorAll(".country-name")[0];
    var txtValue = countryName.textContent || countryName.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      country.style.display = "";
    } else {
      country.style.display = "none";
    }
  }
}

//List
function getdata(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.warn(error));
}
//Show All Countries
function showCountry(country, i) {
  let p;
  let textnode;
  let className = "";

  if (country.continents[0] == "Africa") {
    className = "africa";
  }
  if (country.continents[0] == "Asia") {
    className = "asia";
  }
  if (
    country.continents[0] == "North America" ||
    country.continents[0] == "South America"
  ) {
    className = "america";
  }
  if (country.continents[0] == "Europe") {
    className = "europe";
  }
  if (
    country.continents[0] == "Oceania" ||
    country.continents[0] == "Antarctica"
  ) {
    className = "oceania";
  }

  className +=
    " country cursor-pointer bg-white rounded-lg shadow-md shadow-gray dark:bg-blue-dark";

  var div = document.createElement("div");
  div.className = className;

  if ("flags" in country && "png" in country.flags) {
    let flagPng = country.flags.png;
    let img = document.createElement("img");
    img.src = flagPng;
    img.className = "h-40 w-96 md:w-80 rounded-t-lg";
    div.appendChild(img);
  }

  if ("name" in country && "common" in country.name) {
    let name = country.name.common;
    p = document.createElement("p");
    p.className = "country-name font-bold text-lg py-4 px-6";
    textnode = document.createTextNode(name);
    p.appendChild(textnode);
    div.appendChild(p);
  }

  if ("population" in country) {
    let popul = country.population;
    let population = popul.toLocaleString();
    b = document.createElement("b");
    labeltext = document.createTextNode("Population: ");
    b.appendChild(labeltext);
    b.className = "font-semibold";
    p = document.createElement("p");
    p.className = "pb-1 px-6";
    textnode = document.createTextNode(population);
    p.appendChild(b);
    p.appendChild(textnode);
    div.appendChild(p);
  }

  if ("continents" in country) {
    let region = country.continents[0];
    b = document.createElement("b");
    labeltext = document.createTextNode("Region: ");
    b.appendChild(labeltext);
    b.className = "font-semibold";
    p = document.createElement("p");
    p.className = "pb-1 px-6";
    textnode = document.createTextNode(region);
    p.appendChild(b);
    p.appendChild(textnode);
    div.appendChild(p);
  }

  if ("capital" in country) {
    let capital = country.capital[0];
    b = document.createElement("b");
    labeltext = document.createTextNode("Capital: ");
    b.appendChild(labeltext);
    b.className = "font-semibold";
    p = document.createElement("p");
    p.className = "pb-12 px-6";
    textnode = document.createTextNode(capital);
    p.appendChild(b);
    p.appendChild(textnode);
    div.appendChild(p);
  }

  let index = i;
  p = document.createElement("p");
  p.className = "index hidden";
  textnode = document.createTextNode(index);
  p.appendChild(textnode);
  div.appendChild(p);

  container.appendChild(div);
}

function listCountries(data) {
  var i = 0;
  data.forEach((country) => {
    showCountry(country, i);
    i++;
  });
}
