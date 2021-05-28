
const filterCountry = (country)=>{
    country = country.toUpperCase();

    if(country == 'NIGERIA'){
        return 'NG'
    }

    if(country == 'GHANA'){
        return 'GH'
    }

    if(country == 'KENYA'){
        return 'KE'
    }

    if(country == 'UGANDA'){
        return 'UG'
    }
    return country;
}

module.exports = {
    filterCountry
};