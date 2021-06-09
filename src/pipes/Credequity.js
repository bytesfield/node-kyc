const httpProcessor = require('../HttpProcessor');
const services = require('../config/services');
const constants = require('../config/constants');

class Credequity
{

    constructor() {
        this.client = services.credequity.client;
        this.apiKey = services.credequity.api_key;
        this.baseUrl = services.credequity.api_url;

    }

    /**
    * Process axios calls
    * 
    * @param {string} method The call method get|post|put|delete|patch
    * @param {string} url The url to call
    * @param {object|formData} payload The payload data to send with the call
    */
    process(method, url, payload) {
        //HttpProcessor class to handle axios calls
        let processor = new httpProcessor(this.baseUrl, this.apiKey, this.client);

        return processor.process(method, url, payload)
    }

    /**
    * Handles the ID request
    *
    * @param IdFilter IdFilter
    * @return response
    */
    async handle(IdFilter)
    {
        if (! IdFilter.isSuccessful()) {
            if (IdFilter.isWithImage()) {
                this.getWithImage(IdFilter);
            } else {

                const idNumber =  IdFilter.getIDNumber();
                const firstName =  IdFilter.getFirstName();
                const lastName =  IdFilter.getLastName();
                const phone =  IdFilter.getPhoneNumber();

                if (IdFilter.getIDType() === constants.idValues.TYPE_BVN) {
                    const url = '/CredBvn/api/v1/Bvn/GetCustomerBvn';

                    const body = {
                        'bvn' : idNumber,
                        'PhoneNumber' : phone
                    };

                    return this.postData(IdFilter,body,url);
                }
                if (IdFilter.getIDType() === constants.idValues.TYPE_NIN) {
                    if (! IdFilter.isSuccessful()) {
                        const url = '/CredNin/api/v1/Identity?phoneNo=' + phone;
                        const body = {};

                        return this.postData(IdFilter,body,url);
                    }

                    //If request is not successful makes post with IdNumber
                    if (! IdFilter.isSuccessful()) {
                        const url = '/CredNin/api/v1/IdentityByNin?nin=' + idNumber;
                        const body = {};

                        return this.postData(IdFilter,body,url);
                    }
                }

                if (IdFilter.getIDType() === constants.idValues.TYPE_DRIVERS_LICENSE) {
                    const url = '/Verify/api/v1/FrscInfo';

                    const body = {
                        'firstname' : firstName,
                        'lastname' : lastName,
                        'phoneNo' : phone,
                        'frscidentityNo' : idNumber
                    };
                    return this.postData(IdFilter,body,url);
                }

                if (IdFilter.getIDType() === constants.idValues.TYPE_CUSTOMER_PROFILE) {
                    const url = '/CredBvn/api/v1/CustomerProfile';
                    IdFilter.setCredequityProfile();
                    const profile = IdFilter.getCredequityProfile();

                    const body = {
                        "Nin" : profile['nin'],
                        "FrscNo" : profile['frscno'],
                        "phoneNo" : phone,
                        "Bvn" : profile['bvn']
                    };
                    
                    return this.postData(IdFilter,body,url);
                }
            }
        }

    }

    /**
    * Get ID information via images
    *
    * @param {object} IdFilter
    * @return response
    */
    getWithImage(IdFilter){
         const relative = (IdFilter.getIDType() === 'NIN') ? 'VerifyNinWithFace' : 'VerifyFrscWithFace';
         
         const url = '/CredOcr/api/v1/' + relative;
 
                
        const body = {
            'IdentificationProof' : IdFilter.getIdentificationProof(),
            'FaceProof' : IdFilter.getFaceProof()
        };

        this.postData(IdFilter,body,url);
 
         
     }

    /**
     * Make API call and get the required data from Credequity
     *
     * @param {object} IdFilter
     * @param {object} body
     * @param {string} url
     * @return {object}
     */
    async postData(IdFilter, body, url){
      
        try {
            const response =  await this.process('POST', url, body);
        
            if (response.message === 'Successful') {

                IdFilter.confirmSuccess();

                IdFilter.setHandler(this.client);
                
                IdFilter.setData({
                    'handler' : IdFilter.getHandler(),
                    'message' : IdFilter.getIDType() + ' Verified' + ' Successfully',
                    'data' : response.data
                });
                
                return IdFilter.getData();
             } else {
                IdFilter.setError({'error' : response.error});
             }
        } catch (error) {
            IdFilter.setError({'error' : error});
                
            return IdFilter.getError();
        }   
    }
}

module.exports = Credequity;