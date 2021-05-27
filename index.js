const NinVerification = require('./src/services/NinVerification');

class SabiCustomer{
    constructor(requestData = {}){
        this.requestData = requestData;

    }
    
    async verifyNin(){

        const ninVerification = new NinVerification(this.requestData);

        return await ninVerification.verify();
    
    }
}


module.exports = SabiCustomer;