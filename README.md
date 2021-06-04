# Sabi Customer Package

It is a Know Your Customer (KYC) Nodejs Library. In Development Stage

# Description

This is a Know Your Customer (KYC) Nodejs Package to verify business's customer identity using Smile Identity, Appruve and Credequity KYC services. This service currently support countries like Nigeria(NG), Ghana(GH), Kenya(KE), Uganda(UG).

## Installation

[Node](https://nodejs.org/en/) 14 + and [NPM](https://www.npmjs.com/) are required.

To get the latest version of Sabi Customer, simply require it

```bash
npm install sabi-customer
```

Or add the following line to the `dependencies` block of your `package.json` file.

```
"sabi-customer": "1.0.*"
```

You'll then need to run `npm install` or `npm update` to have it installed.

## Configuration

Once Sabi-Customer is installed, you will need to add the following credentials gotten from the different KYC service providers to your `.env`. Click on the names it will redirect you to their websites where you can sign up and get there API KEYs.

_If you are using a hosting service like heroku, ensure to add the above details to your configuration variables._

- [SMILE IDENTITY](https://docs.smileidentity.com/) <br/>

```javascript
SMILE_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
SMILE_PARTNER_ID = xxxx;
```

- [APPRUVE](https://www.appruve.co/) <br/>

```javascript
APPRUVE_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
```

- [CREDEQUITY](https://credequity.com/) <br/>

```javascript
CREDEQUITY_API_URL = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx;
```

## Usage

```javascript
const SabiCustomer = require("sabi-customer");

const sabiCustomer = new SabiCustomer();
```

#### For Nigeria (NG)

```javascript
const SabiCustomer = require("sabi-customer");
```

##### CREDEQUITY Service

###### ID Verification

Supported ID Types Values:

```javascript
NIN, BVN, DRIVERS_LICENSE;
```

```javascript
const payload = {
  id: "00000000000",
  id_type: "ID_TYPE",
  first_name: "KAYODE",
  last_name: "BABATUNDE",
  date_of_birth: "24-11-1975",
  phone_number: "1234567890",
};

const response = await sabiCustomer.verifyID(payload);
```
