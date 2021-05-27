const httpProcessor = require('../HttpProcessor');
const services = require('../config/services');
const constants = require('../config/constants');

class Appruve
{

    constructor() {
        this.client = services.appruve.client;
        this.apiKey = services.appruve.api_key;
        this.baseUrl = services.appruve.api_url;

        /**
        * HttpProcessor class to handle axios calls
        */
        this.processor = new httpProcessor(this.baseUrl, this.apiKey, this.client);

    }


    /**
     * Process axios calls
     * 
     * @param {string} method The call method get|post|put|delete|patch
     * @param {string} url The url to call
     * @param {object|formData} payload The payload data to send with the call
     */
     process(method, url, payload) {
        return this.processor.process(method, url, payload)
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

            const country=IdFilter.getCountry().toLowerCase();
            const type = this.getType(IdFilter.getIDType());
            const url = 'v1/verifications/' + country + '/' + type;

            const idNumber =  IdFilter.getIDNumber();
            const firstName =  IdFilter.getFirstName();
            const lastName =  IdFilter.getLastName();
            const middleName =  IdFilter.getMiddleName();
            const dateOfBirth =  IdFilter.getDOB();
            const phone =  IdFilter.getPhoneNumber();
            const expiryDate =  IdFilter.getExpiry();
            const gender =  IdFilter.getGender();
            const address =  IdFilter.getAddress();

            const body = {
                'id' : idNumber,
                'first_name' : firstName,
                'last_name' : lastName,
                'middle_name' : middleName,
                'date_of_birth' : dateOfBirth,
                'phone_number' : phone,
                'expiry_date' : expiryDate,
                'gender' : gender,
                'address' : address
            };

            try {
                const response = await this.process('POST', url, body);

                IdFilter.confirmSuccess();

                IdFilter.setHandler(this.client);

                IdFilter.setData({
                    'handler' : IdFilter.getHandler(),
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
        if (type === constants.idValues.TYPE_NATIONAL_ID  || type === constants.idValues.TYPE_NIN ) {
            return 'national_id';
        }
        if (type === constants.idValues.TYPE_DRIVERS_LICENSE) {
            return 'driver_license';
        }
        if (type === constants.idValues.TYPE_VOTER_CARD) {
            return 'voter';
        }
        if (type === constants.idValues.TYPE_BVN) {
            return 'bvn';
        }
        return type.toLowerCase();
    }
}

module.exports = Appruve;