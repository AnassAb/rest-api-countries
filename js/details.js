//Viewport
const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
//
const oFlag = document.getElementById("flag");
const oName = document.getElementById("name");
const oNativeName = document.getElementById("native-name");
const oPopulation = document.getElementById("population");
const oRegion = document.getElementById("region");
const oSubRegion = document.getElementById("sub-region");
const oCapital = document.getElementById("capital");
const oTld = document.getElementById("tld");
const oCurrency = document.getElementById("currency");
const oLang = document.getElementById("lang");
const oBorders = document.getElementById("borders");
//Dark Mode
const darkModeBtn = document.getElementById("dark-mode");
const html = document.getElementsByTagName("html")[0];
//Back
const backBtn = document.getElementById("back");

const api_url = "https://restcountries.com/v3.1/all";

//Dark Mode
darkModeBtn.addEventListener("click", switchMode);

var para = new URLSearchParams(window.location.search);
var index = para.get("country-index");
var darkMode = para.get("dark-mode");

if (darkMode == "true") {
  switchMode();
}

backBtn.addEventListener("click", function (event) {
  var bool = html.classList.contains("dark");
  var para = new URLSearchParams();
  para.append("dark-mode", bool);
  location.href = "index.html?" + para.toString();
});
oBorders.addEventListener("click", function (event) {
  var target = event.target;
  if (target.classList.contains("boo")) {
    var bool = html.classList.contains("dark");
    target.href += "&dark-mode=" + bool;
  }
});
getdetails(api_url, index);

function getdetails(url, n) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => setCountryInfo(data, data[n]))
    .catch((error) => console.warn(error));
}

function setCountryInfo(data, country) {
  if ("name" in country && "common" in country.name) {
    let name = country.name.common;
    oName.innerHTML = name;
  }

  if ("flags" in country && "png" in country.flags) {
    let flagPng = country.flags.png;
    oFlag.src = flagPng;
    oFlag.alt = country.name.common + "'s flag";
  }

  if ("name" in country && "nativeName" in country.name) {
    let nName = Object.values(country.name.nativeName);
    let nativeName = nName[nName.length - 1].common;
    oNativeName.innerHTML =
      "<b class='font-semibold'>Native Name: </b>" + nativeName;
  }

  if ("population" in country) {
    let p = country.population;
    let population = p.toLocaleString();
    oPopulation.innerHTML =
      "<b class='font-semibold'>Population: </b>" + population;
  }

  if ("continents" in country) {
    let region = country.continents[0];
    oRegion.innerHTML = "<b class='font-semibold'>Region: </b>" + region;
  }

  if ("subregion" in country) {
    let subRegion = country.subregion;
    oSubRegion.innerHTML =
      "<b class='font-semibold'>Sub Region: </b>" + subRegion;
  }

  if ("capital" in country) {
    let capital = country.capital[0];
    oCapital.innerHTML = "<b class='font-semibold'>Capital: </b>" + capital;
  }

  if ("tld" in country) {
    let tld = country.tld[0];
    oTld.innerHTML = "<b class='font-semibold'>Top Level Domain: </b>" + tld;
  }

  if ("currencies" in country) {
    let curr = Object.values(country.currencies);
    let currency = curr[0].name;
    oCurrency.innerHTML =
      "<b class='font-semibold'>Currencies: </b>" + currency;
  }

  if ("languages" in country) {
    let langArr = Object.values(country.languages);
    let languages = "";
    for (lang of langArr) {
      languages += lang;
      if (langArr.indexOf(lang) < langArr.length - 2) {
        languages += ", ";
      }
      if (langArr.indexOf(lang) == langArr.length - 2) {
        languages += " and ";
      }
    }
    oLang.innerHTML = "<b class='font-semibold'>Languages: </b>" + languages;
  }

  if ("borders" in country) {
    let borders = country.borders;
    oBorders.innerHTML = "<b class='font-semibold'>Border Countries: </b>";
    var limit = 5;
    if (vw < 1280) {
      oBorders.innerHTML += "<br /> <br />";
    }

    if (vw < 650) {
      limit = 4;
    }

    if (borders.length < limit) {
      for (border of borders) {
        oBorders.innerHTML +=
          '<a class="boo bg-white text-sm rounded-sm shadow-[0px_0px_5px_1px_rgba(125,125,125,0.2)] py-1 px-6 mx-1 dark:bg-blue-dark dark:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.3)]" href="details.html?country-index=' +
          countryIndex(data, border) +
          '">' +
          cca3ToName(data, border) +
          "<a>";
      }
    } else {
      for (border of borders) {
        oBorders.innerHTML +=
          '<a class="boo bg-white text-sm rounded-sm shadow-[0px_0px_5px_1px_rgba(125,125,125,0.2)] py-1 px-6 mx-1 dark:bg-blue-dark dark:shadow-[0px_0px_10px_1px_rgba(0,0,0,0.3)]" href="details.html?country-index=' +
          countryIndex(data, border) +
          '">' +
          cca3ToName(data, border) +
          "<a>";
        if (
          borders.indexOf(border) % (limit - 2) == 0 &&
          borders.indexOf(border) != 0
        ) {
          oBorders.innerHTML += "<br /> <br />";
        }
      }
    }
  } else {
    oBorders.innerHTML =
      "<b class='font-semibold'>Border Countries:  </b> No Countries";
  }
}

function cca3ToName(data, cca3) {
  for (country of data) {
    if (country.cca3 === cca3) {
      return country.name.common;
    }
  }
}

function countryIndex(data, cca3) {
  for (country of data) {
    if (country.cca3 === cca3) {
      return data.indexOf(country);
    }
  }
}
//Dark Mode
function switchMode() {
  html.classList.toggle("dark");
}
