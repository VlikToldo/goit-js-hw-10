export default class CountriesApi {

    constructor() {
        this.searchName = '';
    }

    fetchCountries() {
       return fetch(`https://restcountries.com/v3.1/name/${this.searchName}?fields=name,capital,population,flags,languages`) 
        .then(resp => resp.json())
        .then(data => {
            return data
        })
    }

    get name () {
        return this.searchName;
    }

    set name (newName) {
        this.searchName = newName;
    }
}





