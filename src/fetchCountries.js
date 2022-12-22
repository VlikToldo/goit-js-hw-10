export default class CountriesApi {

    constructor() {
        this.searchName = '';
    }

    fetchCountries() {
       return fetch(`https://restcountries.com/v3.1/name/${this.searchName}?fields=name,capital,population,flags,languages`) 
        .then(resp =>{
            if (!resp.ok) {
              throw new Error(resp.status);
              onError();
        } 
            return resp.json();
    })
    }

    get name () {
        return this.searchName;
    }

    set name (newName) {
        this.searchName = newName;
    }
}





