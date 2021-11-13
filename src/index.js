import './css/styles.css';
import fetchCountries from './fetchCountries'
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce'

const refs = {
    inputEl: document.querySelector('#search-box'),
    cardCountryEl: document.querySelector('.country-info'),
    countryListEl: document.querySelector('.country-list')
}


const DEBOUNCE_DELAY = 300;

const clearCard = () => refs.cardCountryEl.innerHTML = ''


function makeCardCountry() {
    let countryName = refs.inputEl.value.trim()
    if(!countryName) return
    const countryObj = fetchCountries(countryName)
    countryObj
    .then(data => {
        console.log(data)
        if(!data) {
            clearCard()
            Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if(data.length > 10) {
            clearCard()
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
            makeMockupCountry(data)
        }
    })
}

refs.inputEl.addEventListener('input', debounce(makeCardCountry, DEBOUNCE_DELAY))


function makeMockupCountry(country) {
    if(!country) return
    country.length === 1 ? countryCardMarkup(country) : listCountryMarkup(country)
}


function listCountryMarkup(country) {
    const markup = country.map(({ name: { official }, flags: { png }}) => {
        return ` <ul class='main-list'>
                    <img src="${png}" class="image">
                    <h2>${official}</h2>
                 </ul>`
    }).join('')
    refs.cardCountryEl.innerHTML = markup
}

function countryCardMarkup(country) {
    const markup = country.map(({ name: { official }, flags: { png },capital, population, languages }) => {
        return ` <ul class='main-list'>
                    <img src="${png}" class="image">
                    <h2>${official}</h2>
                 </ul>
                 <ul class='list'>
                    <li class='country-desc'><span class="paragraph">Capital:</span>${capital}</li>
                    <li class='country-desc'><span class="paragraph">Population:</span>${population}</li>
                    <li class='country-desc'><span class="paragraph">Languages:</span>${Object.values(languages)}</li>
                 </ul>`
    }).join('')
    refs.cardCountryEl.innerHTML = markup
}



