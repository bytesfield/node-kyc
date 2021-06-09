const countries = {
    'Nigeria' : 'NG',
    'Ghana' : 'GH',
    'Kenya' : 'KE',
    'Uganda' : 'UG',
    'South Africa' : 'ZA'
}

const filterCountry = (country = null)=>{
    if(country == null || country == undefined){
        return 'NG';
    }
    country = country.toUpperCase();

    if(country == 'NIGERIA'){
        return 'NG';
    }

    if(country == 'GHANA'){
        return 'GH';
    }

    if(country == 'KENYA'){
        return 'KE';
    }

    if(country == 'UGANDA'){
        return 'UG';
    }

    return country;
}

const randomNumber = (max)=> {
    return Math.floor(Math.random() * max);
}

const isString = (string) =>{
    
    if (typeof string === 'string' || string instanceof String){
        return true;
    }

    return false;
}


module.exports = {
    filterCountry,
    randomNumber,
    isString,
    countries
};