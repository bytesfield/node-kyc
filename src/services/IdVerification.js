const appruve = require('../pipes/Appruve');
const IDFilter = require('../classes/IdFilter');
const services = require('../config/services');
const constants = require('../config/constants');
const { filterCountry }= require('../classes/Helper');

const Pipeline = require('pipeline-js');

let Appruve = new appruve();


class IdVerification {

     constructor(data) {
        this.country = filterCountry(data.country),
        this.id_type = data.id_type.toLocaleUpperCase(),
        this.id_number = data.id,
        this.first_name = data.first_name,
        this.last_name = data.last_name,
        this.middle_name = data.middle_name,
        this.date_of_birth = data.date_of_birth,
        this.phone = data.phone_number,
        this.pin = data.pin,
        this.tin = data.tin,
        this.gender = data.gender,
        this.full_name = data.first_name + ' ' + data.last_name
        
    }

    async verify(){
        const IdFilter = new IDFilter(
            this.country,  
            this.id_type,  
            this.id_number,
            this.first_name,
            this.last_name,
            this.middle_name,
            this.date_of_birth,
            this.phone,
            this.pin,
            this.tin,
            this.gender,
            this.full_name
                
        );

        const AppruvePipe  = await Appruve.handle(IdFilter);

        const pipeline = new Pipeline([
            AppruvePipe
          ]);
        const response = pipeline.process(IdFilter);

        if(IdFilter.getHandler() == services.appruve.client){
    
            if(IdFilter.getCountry() == 'GH'){
                if( IdFilter.getIDType() == constants.idValues.TYPE_VOTER_CARD){
                    return response;
                }//Exclude Appruve Field Verification for this

                if( IdFilter.getIDType() == constants.idValues.TYPE_TIN){
                    if(!response.data.is_valid){
                        return { 'error' : 'Tin is not valid'} ;
                    }

                    return response;
                }//Exclude Appruve Field Verification for this
                
                if(IdFilter.getIDType() == constants.idValues.TYPE_DRIVERS_LICENSE){
                    if(!response.data.is_full_name_match){
                        return { 'Fullname' : 'Fullname does not match'} ;
                    }

                    if(!response.data.is_date_of_birth_match){
                        return { 'Fullname' : 'Date of birth does not match'} ;
                    }
                    return response;
                }//Exclude Appruve Field Verification for this

                if(IdFilter.getIDType() == constants.idValues.TYPE_SSNIT){
                    if(!response.data.is_full_name_match){
                        return { 'Fullname' : 'Fullname does not match'} ;
                    }

                    return response;
                }//Exclude Appruve Field Verification for this

            }

            if(IdFilter.getIDType() == constants.idValues.TYPE_TIN ||  IdFilter.getIDType() == constants.idValues.TYPE_KRA){
                return response;
            }//Exclude Appruve Field Verification for this

            const isVerified = this.verifyAppruve(response);
    
            if(isVerified == true){
                return response;
            }
                
            return isVerified;

        }
        
        return response;

    }

    /**
     * Verify Appruve information
     *
     * @param {object} result
     * @return boolean
     */
    verifyAppruve(result)
     {
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
module.exports = IdVerification;

