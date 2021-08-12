let resultCountriesEl = document.getElementById('resultCountries');
let searchInputEl = document.getElementById('searchInput');
let spinnerEl = document.getElementById('spinner');

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountry(country) {

    let countryEl = document.createElement('div');
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);

    let countryFlagEl = document.createElement('img');
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfoEl)

    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl)

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countryPopulationEl)

}

function displaySearchResults() {
    for (let x of countriesList) {
        let name = x.name;
        if (name.includes(searchInputVal)) {
            createAndAppendCountry(x)
        }
    }
}

function getCounties() {
    let url = "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
    let options = {
        method: "GET"
    }

    resultCountriesEl.textContent = "";

    spinnerEl.classList.remove('d-none');
    resultCountriesEl.classList.add("d-none")

    //d
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            resultCountriesEl.classList.remove('d-none');
            spinnerEl.classList.add("d-none");
            countriesList = jsonData;
            //resultCountriesEl.textContent=countriesList;
            //resultCountries
            displaySearchResults();
        });
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    getCounties();
}

getCounties();
searchInputEl.addEventListener('keyup', onChangeSearchInput)