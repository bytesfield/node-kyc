const IdVerification = require('./src/services/IdVerification');

class SabiCustomer{
    constructor(requestData = {}){
        this.requestData = requestData;

    }

    async verifyID(){

        const idVerification = new IdVerification(this.requestData);

        return await idVerification.verify();
    
    }
}

module.exports = SabiCustomer;