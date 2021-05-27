const IdVerification = require('./src/services/IdVerification');

class SabiCustomer{
    constructor(requestData = {}){
        this.requestData = requestData;

    }

    async verifyId(){

        const idVerification = new IdVerification(this.requestData);

        return await idVerification.verify();
    
    }
}

module.exports = SabiCustomer;