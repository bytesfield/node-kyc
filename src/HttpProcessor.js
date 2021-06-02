const axios = require('axios');
const services = require('./config/services');

class HttpProcessor {
    /**
    * Initialize the configuration for this class to communicate with axios
    * @param {string} url 
    * @param {string} apiKey 
    * @param {string} client 
    */
    constructor(baseUrl, apiKey = null, client) {

        //Configure axios
        axios.defaults.baseURL = baseUrl;

        axios.interceptors.request.use(  
            config => {
                if(client == services.credequity.client){
                    config.headers.common['Access-Key'] = `Bearer ${apiKey}`;
                }
                if (client == services.appruve.client || client == services.verifyMe.client ) {
                    config.headers.Authorization = `Bearer ${apiKey}`;
                }

                return config;
            },
            error => Promise.reject(error)
        );

        this.customAxios = axios;
    }

    /**
    * Process axios calls
    * 
    * @param {string} method The call method get|post|put|delete|patch
    * @param {string} url The url to call
    * @param {object|array|formData} payload The payload data to send with the call
    */
    process(method, url, payload = {}) {
        return new Promise((res, rej) => {
            this.customAxios({
                method: method,
                url: url,
                data: payload
            }).then((response) => {
                res(response.data)
            }).catch((err) => {
                rej(err.response.data)
            });
        });
    }
}

module.exports = HttpProcessor;