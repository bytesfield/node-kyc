const IdVerification = require('./src/services/IdVerification');
const services = require('./src/config/services');
const { isString } = require('./src/classes/Helper');
const { idValues } = require('./src/config/constants');
const { countries } = require('./src/classes/Helper');

class SabiCustomer{

    async verifyID(requestData = {}, handler = null){

        //Checks whether Handler is valid
        if(handler != null){
            if(!isString(handler)){
                return { 'error' : handler + ' is not a valid string' };
            }

            const pipes = [
                services.credequity.client.toUpperCase(),
                services.appruve.client.toUpperCase(),
                services.smile.client.toUpperCase()
            ];

            if(!pipes.includes(handler.toUpperCase())){
                return { 'error' : handler + ' is not a valid handler' };
            }
        }

        if(Object.keys(requestData).length <= 0 ){
            return { 'error' : 'Payload must not be empty'};
        }

        const idValue = Object.values(idValues);

        //Checks for valid ID Types
        if(!idValue.includes(requestData.id_type)){
            return { 'error' : requestData.id_type + ' is not supported or not a valid ID TYPE, supported types: ' + idValue };
        }

        const supportedCountries = Object.values(countries);

        //Checks for supported country
        if(!supportedCountries.includes(requestData.country)){
            return { 'error' : requestData.country + ' is not a valid country or not supported, supported countries are: ' + supportedCountries };
        }
        
        const idVerification = new IdVerification(requestData);

        return await idVerification.verify(handler);
    
    }
}

module.exports = SabiCustomer;