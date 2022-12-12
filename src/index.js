import './css/styles.css';
import  CountriesApi from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info'),
}

const countriesApi = new CountriesApi();

refs.input.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));
refs.list.addEventListener('click', onItemClick);


function onSearchBox (e) {
    e.preventDefault();

    countriesApi.name = e.target.value.trim();

    if (countriesApi.name === '') {
        clearMarkup();
        return
    }

    countriesApi.fetchCountries()
    .then(countries => {

        if (countries.length > 10 ) {

            clearMarkup();
            Notify.info('Too many matches found. Please enter a more specific name.');
            return

        } else if (countries.length >= 2) {

            clearMarkup();
            countryList(countries);
            return

        } else if (countries.length === 1) {

            clearMarkup();
            countryInfo(countries);
            return
        } 
    })
    .catch((onError));

}

    function countryList (countries) {

        const markup = countries
        .map(({name, flags}) => { 
            return  `<button class="country_item">
            <img class="country-flag" src="${flags.svg}" alt="flag" width="30" height="100%">
            <p class="country-name">${name.official}</p>
            </button>`
            
        })
        .join("");

        refs.list.innerHTML = markup;
    }

    function countryInfo (countries) {
        const languagesValue = Object.values(countries[0].languages).join(', ');

        const markup = countries
        .map(({name, capital, flags, population}) => { 
            return `<div class="country-info-head">
            <img class="country-info-flag" src="${flags.svg}" alt="flag" width="50" height="100%">
            <h1 class="country-info-name">${name.official}</h1>
            </div>
            <ul class="country-info-list">
              <li>
                <p class="country-info-item">Capital: </p>
                <span class="country-info-value">${capital}</span>
              </li>
              <li>
                <p class="country-info-item">Population: </p>
                <span class="country-info-value">${population}</span>
              </li>
              <li>
                <p class="country-info-item">Languages: </p>
                <span class="country-info-value">${languagesValue}</span>
              </li>
            </ul>`
            
        })
        .join("");

        refs.list.innerHTML = markup;
    }

    function onItemClick (e) {
        clearMarkup();

        countriesApi.name = e.target.textContent;

        countriesApi.fetchCountries()
    .then(countries => 
        countryInfo(countries))
    }


    function clearMarkup() {
        refs.list.innerHTML = '';
        refs.infoCountry.innerHTML = '';
    }
    
    function onError() {
        clearMarkup();
        Notify.failure("Oops, there is no country with that name");
    }







