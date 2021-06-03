const IdVerification = require('./src/services/IdVerification');

class SabiCustomer{
    constructor(requestData = {}){
        this.requestData = requestData;

    }

    async verifyID(){

        if(Object.keys(this.requestData).length <= 0 ){
            return { 'error' : 'Payload must not be empty'};
        }

        const idVerification = new IdVerification(this.requestData);

        return await idVerification.verify();
    
    }
}

module.exports = SabiCustomer;