const httpProcessor = require('../HttpProcessor');
const services = require('../config/services');
const constants = require('../config/constants');
const md5 = require('md5');
const random = require('@aspiesoft/random-number-js');
const crypto = require('crypto');
// const https = require('https');
// const request = require('request'); 
// const URLSafeBase64 = require('urlsafe-base64');
const uuid = require('uuid4'); 

class Smile
{

    constructor() {
        this.client = services.smile.client;
        this.apiKey = services.smile.api_key;
        this.baseUrl = services.smile.api_url;
        this.partnerId = services.smile.partner_id;

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
            const generatedKey = this.generateSecretKey(this.partnerId, this.apiKey);
            const jobId = md5(Date.now()+ random(1, 1000000000));

            const idType = IdFilter.getIDType();
            const country = IdFilter.getCountry();
            const url = '/v1/id_verification';

            const idNumber =  IdFilter.getIDNumber();
            const firstName =  IdFilter.getFirstName();
            const lastName =  IdFilter.getLastName();
            const middleName =  IdFilter.getMiddleName();
            const dateOfBirth =  IdFilter.getDOB();
            const phone =  IdFilter.getPhoneNumber();
            const userId = IdFilter.getUserId();
            const company = IdFilter.getCompany();

            const body = {
                'partner_id' : this.partnerId,
                'timestamp' : generatedKey.timestamp,
                'sec_key' : generatedKey.secretKey,
                'country'  :  country.toUpperCase(),
                'id_type'  :  idType,
                'id_number' : idNumber,
                'middle_name' : middleName,
                'first_name' : firstName,
                'last_name' : lastName,
                'phone_number' : phone,
                'dob' : dateOfBirth,
                'company' : company,
                'partner_params' : {
                    'job_id' : jobId,
                    'job_type' : 5,
                    'user_id' : userId
                }

            };

            try {
                const response = await this.process('POST', url, body);

                IdFilter.confirmSuccess();

                IdFilter.setHandler(this.client);

                IdFilter.setData({
                    'handler' : IdFilter.getHandler(),
                    'country' : IdFilter.getCountry().toUpperCase(),
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

    /**
     * Generate Secret Key
     *
     * @param {string} partnerId
     * @param {string} apiKey
     * @return object
     */
     generateSecretKey(partnerId, apiKey)
     {
        // Calculating outgoing signature:
        const timestamp = Date.now();

        const hash = crypto.createHash('sha256').update(parseInt(partnerId, 10) + ":" + timestamp).digest('hex');
        
        const encrypted = crypto.publicEncrypt({
          key: Buffer.from(apiKey, 'base64'),
          padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(hash)).toString('base64');

        const secretKey = [encrypted, hash].join('|');

        return {'secretKey' : secretKey, 'timestamp' :timestamp };
     }

     /**
     * Confirm Secret Key
     *
     * @param {string} timestamp
     * @param {string} secretKey
     * @return boolean
     */
     confirmSecretKey(timestamp, secretKey){

        var encrypted, hashed;
        [encrypted, hashed] = secretKey.split("|")

        var hash = crypto.createHash('sha256').update(parseInt(this.partnerId) + ":" + timestamp).digest('hex');
        
        var decrypted = crypto.publicDecrypt({
            key: Buffer.from(Buffer.from(this.apiKey, 'base64')),
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(encrypted, 'base64'));

        var success = decrypted == hashed && hashed == hash;

        return success;
     }

}

module.exports = Smile;