require('dotenv').config()

const services = {};

services.smile = {
    'client' : 'Smile',
    'api_url' : process.env.SMILE_API_URL,
    'api_key': process.env.SMILE_API_KEY,
    'partner_id': process.env.SMILE_PARTNER_ID,
},
services.appruve = {
    'client' : 'Appruve',
    'api_url': process.env.APPRUVE_API_URL,
    'api_key': process.env.APPRUVE_API_KEY
},
services.credequity = {
    'client' : 'Credequity',
    'api_key': process.env.CREDEQUITY_API_KEY,
    'api_url': process.env.CREDEQUITY_API_URL
},
services.verifyMe = {
    'client' : 'VerifyMe',
    'api_key': process.env.VERIFYME_API_KEY,
    'api_url': process.env.VERIFYME_API_URL
}

module.exports = services;