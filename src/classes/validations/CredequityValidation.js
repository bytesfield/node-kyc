const constants = require('../../config/constants');
class CredequityValidation {

    validate(response, IdFilter){

        const isVerified = this.verify(response, IdFilter);
    
        if(isVerified == true){
            return response;
        }
                
        return isVerified;
    }

    /**
     * Verify Credequity information
     *
     * @param {object} result
     * @param {object} IdFilter
     * @return boolean
     */
    verify(result, IdFilter){
        const data = result.data;
        
        if(IdFilter.getIDType() == constants.idValues.TYPE_BVN ){
            if (data.firstName.toUpperCase() !== IdFilter.getFirstName().toUpperCase()) {
                return { 'error' : 'Firstname does not match'} ;
            }
        
            if (data.lastName.toUpperCase() !== IdFilter.getLastName().toUpperCase()) {
                return { 'error' : 'Lastname does not match'};
            }
        
            if (data.dateOfBirth !== IdFilter.getDOB()) {
                return { 'error' : 'Date of birth does not match'};
            }
        }
        
        if(IdFilter.getIDType() == constants.idValues.TYPE_DRIVERS_LICENSE ){
            if (data.Birthdate !== IdFilter.getDOB()) {
                return { 'error' : 'Date of birth does not match'};
            }
        }
        
        if(IdFilter.getIDType() == constants.idValues.TYPE_NIN ){
            if (data.firstname.toUpperCase() !== IdFilter.getFirstName().toUpperCase()) {
                return { 'error' : 'Firstname does not match'} ;
            }
        
            if (data.birthdate !== IdFilter.getDOB()) {
                return { 'error' : 'Date of birth does not match'};
            }
        }
        
        return true;
            
    }

}

module.exports = CredequityValidation;