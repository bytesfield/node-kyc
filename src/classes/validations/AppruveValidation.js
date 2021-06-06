const constants = require('../../config/constants');

class AppruveValidation {

    validate(response, IdFilter){
        const idType = IdFilter.getIDType();

        if(IdFilter.getCountry() == 'GH'){
            if(idType == constants.idValues.TYPE_VOTER_CARD){
                return response;
            }//Exclude Appruve Field Verification for this

            if(idType == constants.idValues.TYPE_TIN){
                if(!response.data.is_valid){
                    return { 'error' : 'Tin is not valid'} ;
                }

                return response;
            }//Exclude Appruve Field Verification for this
            
            if(idType == constants.idValues.TYPE_DRIVERS_LICENSE){
                if(!response.data.is_full_name_match){
                    return { 'error' : 'Fullname does not match'} ;
                }

                if(!response.data.is_date_of_birth_match){
                    return { 'error' : 'Date of birth does not match'} ;
                }
                return response;
            }//Exclude Appruve Field Verification for this

            if(idType == constants.idValues.TYPE_SSNIT){
                if(!response.data.is_full_name_match){
                    return { 'error' : 'Fullname does not match'} ;
                }

                return response;
            }//Exclude Appruve Field Verification for this

         }

        if(idType == constants.idValues.TYPE_TIN 
            || idType == constants.idValues.TYPE_KRA 
            || idType == constants.idValues.TELCO_SUBSCRIBER  
        ){
            return response;
        }//Exclude Appruve Field Verification for this

        const isVerified = this.verify(response);

        if(isVerified == true){
            return response;
        }
            
        return isVerified;

    }

    /**
     * Verify Appruve information
     *
     * @param {object} result
     * @return boolean
     */
    verify(result){ 
        const data = result.data;
    
        if (! data.is_first_name_match) {
            return { 'error' : 'Firstname does not match'} ;
        }
        if (! data.is_last_name_match) {
            return { 'error' : 'Lastname does not match'};
        }
        if (! data.is_date_of_birth_match) {
            return { 'error' : 'Date of birth does not match'};
        }
 
        return true;

    }
}

module.exports = AppruveValidation;
