require('dotenv').config()

const services = {};

services.smile = {
    'client' : 'Smile',
    'api_url' : 'https://testapi.smileidentity.com',
    'api_key' : process.env.SMILE_API_KEY,
    'partner_id':process.env.SMILE_PARTNER_ID
},
services.appruve = {
    'client' : 'Appruve',
    'api_url': 'https://api.appruve.co',
    'api_key' : process.env.APPRUVE_API_KEY
},
services.credequity = {
    'client' : 'Credequity',
    'api_url': 'http://102.164.38.38',
    'api_key':process.env.CREDEQUITY_API_KEY 
},
services.verifyMe = {
    'client' : 'VerifyMe',
    'api_url':'https://vapi.verifyme.ng',
    'api_key': process.env.VERIFYME_API_KEY
}

module.exports = services;