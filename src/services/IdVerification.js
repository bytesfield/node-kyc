const appruve = require('../pipes/Appruve');
const smile = require('../pipes/Smile');
const credequity = require('../pipes/Credequity');
const IDFilter = require('../classes/IdFilter');
const services = require('../config/services');
const pipeline = require('../classes/Pipeline');
const { filterCountry }= require('../classes/Helper');
const AppruveValidation = require('../classes/validations/AppruveValidation');
const SmileValidation = require('../classes/validations/SmileValidation');
const CredequityValidation = require('../classes/validations/CredequityValidation');

let Appruve = new appruve();
let Smile = new smile();
let Credequity = new credequity();
let appruveValidation = new AppruveValidation();
let smileValidation = new SmileValidation();
let credequityValidation = new CredequityValidation();
let Pipeline = new pipeline();

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

    async verify(handler){
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

        const appruveClient = services.appruve.client.toUpperCase();
        const smileClient = services.smile.client.toUpperCase();
        const credequityClient = services.credequity.client.toUpperCase();

        const executedHandler = IdFilter.getHandler().toUpperCase();

        var response = null;
        const pipes = [Appruve,Smile,Credequity];

        if(handler != null){
            handler = handler.toUpperCase();
            
            if(handler === appruveClient){
                response = await pipes[0].handle(IdFilter);
            }
            if(handler === smileClient){
                response = await pipes[1].handle(IdFilter);
            }
            if(handler === credequityClient){
                response = await pipes[2].handle(IdFilter);
            }
        }else{

            response = Pipeline.send(IdFilter)
                               .through(pipes)
                               .thenReturn();
            
        }

        //Validate Appruve Handler result
        if(executedHandler == appruveClient){   
            appruveValidation.validate(response, IdFilter);
        }

        //Validate Smile Handler result
        if(executedHandler == smileClient){
            smileValidation.validate(response);
        }

        //Validate Credequity Handler result
        if(executedHandler == credequityClient){
            credequityValidation.validate(response, IdFilter);
        }
        
        return response;

    }
}
module.exports = IdVerification;

