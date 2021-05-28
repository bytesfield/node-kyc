
const idValues = {

    'TYPE_PASSPORT' : 'PASSPORT',
    'TYPE_NATIONAL_ID'  :'NATIONAL_ID',
    'TYPE_SSNIT'  :'SSNIT',
    'TYPE_VOTER_CARD'  :'VOTER_CARD',
    'TYPE_VOTER_ID'  :'VOTER_ID',
    'TYPE_ALIEN_CARD'  :'ALIEN_CARD',
    'TYPE_BVN'  :'BVN',
    'TYPE_NIN'  :'NIN',
    'TYPE_NIN_SLIP'  :'NIN_SLIP',
    'TYPE_DRIVERS_LICENSE'  :'DRIVERS_LICENSE',
    'TYPE_TIN'  :'TIN',
    'TYPE_CAC'  :'CAC',
    'NATIONAL_ID_NO_PHOTO'  :'NATIONAL_ID_NO_PHOTO',
    'TELCO_SUBSCRIBER'  : 'TELCO_SUBSCRIBER',
    'TYPE_CUSTOMER_PROFILE'  :'CUSTOMER_PROFILE',
    'TYPE_KRA' : 'KRA'
        
} 

// let regexes = {
//     GH: {
//     DRIVERS_LICENSE: /^[A-Z0-9]{6,10}$/i,
//     SSNIT: /^[A-Z]{1}[A-Z0-9]{12,14}$/i,
//     VOTER_ID: /^[0-9]{10,12}$/,
//     PASSPORT: /^G[A-Z0-9]{7,9}$/i,
//     NATIONAL_ID: /^GHA-[A-Z0-9]{9}-[A-Z0-9]{1}$/i
//   },
//   KE: {
//     NATIONAL_ID: /^[0-9]{1,9}$/,
//     PASSPORT: /^[A-Z0-9]{7,9}$/,
//     ALIEN_CARD: /^[0-9]{6,9}$/
//   },
//   NG: {
//     BVN: /^[0-9]{11}$/,
//     NIN: /^[0-9]{11}$/,
//     NIN_SLIP: /^[0-9]{11}$/,
//     DRIVERS_LICENSE: /^(?=.*[0-9])(?=.*[A-Z])[A-Z0-9]{3}([ -]{1})?[A-Z0-9]{6,12}$/i,
//     VOTER_ID: /^([A-Z0-9]{19}|[A-Z0-9]{9})$/i,
//     CAC: /^(RC)?[0-9]{5,8}$/,
//     TIN: /^[0-9]{8,}-[0-9]{4,}$/
//   },
//   ZA: {
//     NATIONAL_ID: /^[0-9]{13}$/
//   }
// }

module.exports = {
    idValues
}