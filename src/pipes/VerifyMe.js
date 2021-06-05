const httpProcessor = require('../HttpProcessor');
const services = require('../config/services');
const constants = require('../config/constants');

class VerifyMe
{
    constructor() {
        this.client = services.verifyMe.client;
        this.apiKey = services.verifyMe.api_key;
        this.baseUrl = services.verifyMe.api_url;

        /**
        * HttpProcessor class to handle axios calls
        */
        

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
     * Filter id requests
     *
     * @param IdFilter IdFilter
     * @return response
     */
    async handle(IdFilter)
    {
        if (!IdFilter.isSuccessful()) {
            const idType = IdFilter.getIDType().toUpperCase();
            const type = this.getType(idType);
            const idNumber =  IdFilter.getIDNumber();

            const url = '/v1/verifications/identities/' + type + '/:' + idNumber;

            const firstName =  IdFilter.getFirstName();
            const lastName =  IdFilter.getLastName();
            const dateOfBirth =  IdFilter.getDOB();

            const body = {
                'id' : idNumber,
                'firstname' : firstName,
                'lastname' : lastName,
                'dob' : dateOfBirth,
            };

            try {
                const response = await this.process('POST', url, body);

                IdFilter.confirmSuccess();

                IdFilter.setHandler(this.client);

                IdFilter.setData({
                    'handler' : IdFilter.getHandler(),
                    'country' : 'NG',
                    'message' : idType + ' Verified' + ' Successfully',
                    'data' : response
                });
                
                return IdFilter.getData();
                
            } catch (error) {
                //Error occurred
                IdFilter.setError({'error' : error});
                
                console.log(error);
                return IdFilter.getError();
            }
        }

    }

    getType(type)
    {
        if (type === constants.idValues.TYPE_DRIVERS_LICENSE) {
            return 'drivers_license';
        }
        if (type === constants.idValues.TYPE_NIN ) {
            return 'nin';
        }
        if (type === constants.idValues.TYPE_VOTER_CARD) {
            return 'vin';
        }
        if (type === constants.idValues.TYPE_BVN) {
            return 'bvn';
        }
        return type.toLowerCase();
    }
}

module.exports = VerifyMe;