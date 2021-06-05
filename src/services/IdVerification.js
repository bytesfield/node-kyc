const appruve = require('../pipes/Appruve');
const smile = require('../pipes/Smile');
const credequity = require('../pipes/Credequity');
const IDFilter = require('../classes/IdFilter');
const services = require('../config/services');
const constants = require('../config/constants');
const { filterCountry }= require('../classes/Helper');

const Pipeline = require('pipeline-js');

let Appruve = new appruve();
let Smile = new smile();
let Credequity = new credequity();

class IdVerification {

     constructor(data) {
        this.country = filterCountry(data.country),
        this.id_type = data.id_type.toUpperCase(),
        this.id_number = data.id,
        this.first_name = data.first_name,
        this.last_name = data.last_name,
        this.middle_name = data.middle_name,
        this.date_of_birth = data.date_of_birth,
        this.phone = data.phone_number,
        this.pin = data.pin,
        this.tin = data.tin,
        this.gender = data.gender,
        this.full_name = data.first_name + ' ' + data.last_name,
        this.user_id = data.user_id,
        this.company = data.company
        
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
            this.full_name,
            this.user_id,
            this.company
                
        );
        
        //const AppruvePipe = await Appruve.handle(IdFilter);
        const pipeline = new Pipeline([
            //await Credequity.handle(IdFilter),
            //await Appruve.handle(IdFilter)
            await Smile.handle(IdFilter)
            
          ]);

        const response = pipeline.process();

        //Validate Appruve Handler result
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
                        return { 'error' : 'Fullname does not match'} ;
                    }

                    if(!response.data.is_date_of_birth_match){
                        return { 'error' : 'Date of birth does not match'} ;
                    }
                    return response;
                }//Exclude Appruve Field Verification for this

                if(IdFilter.getIDType() == constants.idValues.TYPE_SSNIT){
                    if(!response.data.is_full_name_match){
                        return { 'error' : 'Fullname does not match'} ;
                    }

                    return response;
                }//Exclude Appruve Field Verification for this

            }

            if(IdFilter.getIDType() == constants.idValues.TYPE_TIN 
                ||  IdFilter.getIDType() == constants.idValues.TYPE_KRA 
                || IdFilter.getIDType() == constants.idValues.TELCO_SUBSCRIBER  
            ){
                return response;
            }//Exclude Appruve Field Verification for this

            const isVerified = this.verifyAppruve(response);
    
            if(isVerified == true){
                return response;
            }
                
            return isVerified;

        }

        //Validate Smile Handler result
        if(IdFilter.getHandler() == services.smile.client){

            const isVerified = this.verifySmile(response);
    
            if(isVerified == true){
                return response;
            }
                
            return isVerified;

        }

        //Validate Credequity Handler result
        if(IdFilter.getHandler() == services.credequity.client){

            const isVerified = this.verifyCredequity(response, IdFilter);
    
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
    verifyAppruve(result){
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

      /**
     * Verify Smile information
     *
     * @param {object} result
     * @return boolean
     */
    verifySmile(result){
        const data = result.data;

        if (data.Actions.Verify_ID_Number !== 'Verified') {
            return { 'error' : data.ResultText } ;
        }
     
        return true;

    }

        /**
     * Verify Credequity information
     *
     * @param {object} result
     * @param {object} IdFilter
     * @return boolean
     */
    verifyCredequity(result, IdFilter){
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
module.exports = IdVerification;

