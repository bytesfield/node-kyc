const IdVerification = require('./src/services/IdVerification');

class SabiCustomer{

    async verifyID(requestData = {}){

        if(Object.keys(requestData).length <= 0 ){
            return { 'error' : 'Payload must not be empty'};
        }
        
        const idVerification = new IdVerification(requestData);

        return await idVerification.verify();
    
    }
}

module.exports = SabiCustomer;