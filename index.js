const IdVerification = require('./src/services/IdVerification');
const services = require('./src/config/services');
const { isString } = require('./src/classes/Helper');

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
        
        const idVerification = new IdVerification(requestData);

        return await idVerification.verify(handler);
    
    }
}

module.exports = SabiCustomer;