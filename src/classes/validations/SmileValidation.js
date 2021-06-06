const services = require('../../config/services');

class SmileValidation {

    validate(response){

        const isVerified = this.verify(response);
    
        if(isVerified == true){
            return response;
        }
                
        return isVerified;
    }

     /**
    * Verify Smile information
    *
    * @param {object} result
    * @return boolean
    */
    verify(result){
        const data = result.data;

        if (data.Actions.Verify_ID_Number !== 'Verified') {
            return { 'error' : data.ResultText } ;
        }
     
        return true;

    }

}

module.exports = SmileValidation;