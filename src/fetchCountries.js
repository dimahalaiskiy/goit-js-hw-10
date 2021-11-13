export default function fetchCountryName(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages
    `)
    .then(response => {
        if(response.ok)
           return response.json()
        })
    .catch(error => console.log(error))
}