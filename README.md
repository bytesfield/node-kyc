# Sabi Customer Package

It is a Know Your Customer (KYC) Nodejs Library. In Development Stage

# Description

A Know Your Customer (KYC) Nodejs Package to verify business's customer identity using Smile Identity, Appruve and Credequity KYC services. This service currently support countries like Nigeria(NG), Ghana(GH), Kenya(KE), Uganda(UG).

## Installation

[Node](https://nodejs.org/en/) 14 + and [NPM](https://www.npmjs.com/) are required.

To get the latest version of Sabi Customer, simply install it

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

###### Supported Handlers:

```javascript
SMILE, APPRUVE, CREDEQUITY;
```

_If you want a specific handler to handle your request you can pass a second argument to the verifyID() method as shown below_

```javascript
const response = await sabiCustomer.verifyID(payload, "SMILE");
```

### For Nigeria (NG)

#### APPRUVE SERVICE

##### ID Verification

###### Supported ID Types Values:

```javascript
NIN, BVN, DRIVERS_LICENSE, PASSPORT, TIN, VOTER_CARD;
```

```javascript
const payload = {
  id: "48126406145",
  id_type: "ID_TYPE_VALUE",
  country: "NG",
  first_name: "Michael",
  last_name: "Olugbenga",
  middle_name: "Peter",
  date_of_birth: "1982-05-20",
};

const response = await sabiCustomer.verifyID(payload);
```

#### SMILE IDENTITY SERVICE

##### ID Verification

Supported ID Types Values:

```javascript
NIN_SLIP, BVN, DRIVERS_LICENSE, CAC, TIN, VOTER_ID;
```

```javascript
const payload = {
  id: "48126406145",
  id_type: "ID_TYPE_VALUE",
  country: "NG",
  first_name: "Michael",
  last_name: "Olugbenga",
  user_id: "USER_UNIQUE_ID",
  company: "COMPANY_NAME", //Include this for CAC
};

const response = await sabiCustomer.verifyID(payload);
```

#### CREDEQUITY SERVICE

##### ID Verification

###### Supported ID Types Values:

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

### For Ghana (GH)

#### SMILE IDENTITY SERVICE

##### ID Verification

Supported ID Types Values:

```javascript
SSNIT, VOTER_ID, DRIVERS_LICENSE;
```

```javascript
const payload = {
  id: "48126406145",
  id_type: "ID_TYPE_VALUE",
  country: "GH",
  first_name: "Michael",
  last_name: "Olugbenga",
  user_id: "USER_UNIQUE_ID",
};

const response = await sabiCustomer.verifyID(payload);
```

#### APPRUVE SERVICE

##### ID Verification

Supported ID Types Values:

```javascript
SSNIT, TIN, DRIVERS_LICENSE, PASSPORT, VOTER_CARD;
```

```javascript
const payload = {
  id: "48126406145", //For TIN change this to tin
  id_type: "ID_TYPE_VALUE",
  country: "GH",
  first_name: "Michael",
  last_name: "Olugbenga",
  date_of_birth: "24-11-1975",
};

const response = await sabiCustomer.verifyID(payload);
```

### For Kenya (KE)

#### SMILE IDENTITY SERVICE

##### ID Verification

Supported ID Types Values:

```javascript
ALIEN_CARD, NATIONAL_ID, PASSPORT;
```

```javascript
const payload = {
  id: "48126406145",
  id_type: "ID_TYPE_VALUE",
  country: "KE",
  first_name: "Michael",
  last_name: "Olugbenga",
  user_id: "USER_UNIQUE_ID",
};

const response = await sabiCustomer.verifyID(payload);
```

#### APPRUVE SERVICE

##### ID Verification

Supported ID Types Values:

```javascript
NATIONAL_ID, KRA, PASSPORT;
```

```javascript
const payload = {
  id: "48126406145", //For KRA Change this to pin
  id_type: "ID_TYPE_VALUE",
  country: "KE",
  first_name: "Michael",
  last_name: "Olugbenga",
  date_of_birth: "24-11-1975",
};

const response = await sabiCustomer.verifyID(payload);
```

_Credequity not supported for Kenya_

### For South Africa (ZA)

#### SMILE IDENTITY SERVICE

##### ID Verification

Supported ID Types Values:

```javascript
NATIONAL_ID, NATIONAL_ID_NO_PHOTO;
```

```javascript
const payload = {
  id: "48126406145",
  id_type: "ID_TYPE_VALUE",
  country: "ZA",
  first_name: "Michael",
  last_name: "Olugbenga",
  user_id: "USER_UNIQUE_ID",
};

const response = await sabiCustomer.verifyID(payload);
```

_Credequity and Appruve not supported for South Africa_

### For Uganda (UG)

#### APPRUVE SERVICE

##### ID Verification

Supported ID Types Values:

```javascript
TELCO_SUBSCRIBER;
```

```javascript
const payload = {
  id: "48126406145",
  id_type: "ID_TYPE_VALUE",
  country: "UG",
  phone: "+256000000003",
};

const response = await sabiCustomer.verifyID(payload);
```

_Credequity and Smile not supported for Uganda_

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email abrahamudele@gmail instead of using the issue tracker.

## Credits

- [Abraham Udele](https://github.com/bytesfield) <br/>
  Find me on <br/>
  <a href="https://twitter.com/SaintAbrahams/">Twitter.</a> <br/>
  <a href="https://www.linkedin.com/in/abraham-udele-246003130/">Linkedin.</a>

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
