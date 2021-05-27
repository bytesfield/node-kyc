const appruve = require('../pipes/Appruve');
const IDFilter = require('../classes/IdFilter');
const constants = require('../config/constants');
const services = require('../config/services');

const Pipeline = require('pipeline-js');

let Appruve = new appruve;

class NinVerification {

     constructor(data) {
        this.country = 'NG',
        this.id_type = constants.idValues.TYPE_NIN,
        this.id_number = data.id,
        this.first_name = data.first_name,
        this.last_name = data.last_name,
        this.middle_name = data.middle_name,
        this.date_of_birth = data.date_of_birth,
        this.phone = data.phone_number,
        this.gender = data.gender,
        this.user_id = 1
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
            this.user_id,
            this.gender    
        );
        const AppruvePipe  = await Appruve.handle(IdFilter);

        const pipeline = new Pipeline([
            AppruvePipe
          ]);
        const response = pipeline.process(IdFilter);

        if(IdFilter.getHandler() == services.appruve.client){
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
            return { 'error' : 'Dateof birth does not match'};
         }
      
         return true;
 
     }
}
module.exports = NinVerification;

