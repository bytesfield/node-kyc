require('dotenv').config()

const services = {};
const smileEnvApiKey = process.env.SMILE_API_KEY;
const smileEnvPartnerId = process.env.SMILE_PARTNER_ID;
const appruveEnvApiKey = process.env.APPRUVE_API_KEY;
const credequityEnvApiKey = process.env.CREDEQUITY_API_KEY;


services.smile = {
    'client' : 'Smile',
    'api_url' : 'https://testapi.smileidentity.com',
    'api_key': smileEnvApiKey != null || smileEnvApiKey != undefined ? smileEnvApiKey : 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FEVkk1K2FxMnJWc0lHUFpEbFM2aUNKRmlyQwpuRFY3NEdVU1pCTjVwWHU2MTNuL1pJcGFOaUlVNHZOM3cvNlJpMW5mLy9BTndHNDg3YkY1bG1yU1Yxb2tzVTBUClQ0ejlLNHIzY0loSHpyT3lsaFE3anlsNHJzL01UdnMvRGlER25qSU5KdTU0L3ppb3hndHUvdzlIL2l3M05GdkwKTDhYQ2pXN1lGMWprZ2xzczl3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=',
    'partner_id': smileEnvPartnerId !=null || smileEnvPartnerId != undefined ? smileEnvPartnerId : 1063,
},
services.appruve = {
    'client' : 'Appruve',
    'api_url': 'https://api.appruve.co',
    'api_key': appruveEnvApiKey !=null || appruveEnvApiKey != undefined ? appruveEnvApiKey : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3YzAwNTU3YS1hOTJiLTQ0NjctYWYzZS1mZmQwZGJmNDRhMDYiLCJhdWQiOiI1ZmEzZmRkNC1jN2Q3LTQzZDMtODk5ZS03ZjUwZTFmNDhlYjEiLCJzdWIiOiIwYjY0NmU0Yi0zMjQ0LTRmN2MtOWU5My01ZTZjNGYwNGIwNjMiLCJuYmYiOjAsInNjb3BlcyI6WyJ2ZXJpZmljYXRpb25fdmlldyIsInZlcmlmaWNhdGlvbl9saXN0IiwidmVyaWZpY2F0aW9uX2RvY3VtZW50IiwidmVyaWZpY2F0aW9uX2lkZW50aXR5Il0sImV4cCI6MzE5OTk1OTYxNCwiaWF0IjoxNjIyMTIyODE0fQ.uFKkldvo2lIv5J7LD7iaM5xpSbkUX9cBHbRWe7RkzMs'
},
services.credequity = {
    'client' : 'Credequity',
    'api_url': 'http://102.164.38.38',
    'api_key': credequityEnvApiKey != null || credequityEnvApiKey != undefined ? credequityEnvApiKey : 'b3e04c92-425b-42c9-b63a-602b6f61ee52'
    
},
services.verifyMe = {
    'client' : 'VerifyMe',
    'api_key': process.env.VERIFYME_API_KEY,
    'api_url': process.env.VERIFYME_API_URL
}

module.exports = services;