
class IdFilter {

    constructor (
        country,
        idType,
        idNumber=null,
        firstName=null,
        lastName=null,
        middleName=null,
        dob=null,
        phoneNumber=null,
        pin=null,
        tin=null,
        gender=null,
        full_name=null,
        user_id=null,
        company=null,
        expiry=null,
        address=null,
        identificationProof=null,
        faceProof=null,
        data= {},
        success=false,
        error={},
        withImage=false,
        handler='',
        credequityProfile={},
        registration_number = null
        
    ){
        this.country = country;
        this.idType = idType;
        this.idNumber = idNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.pin = pin;
        this.tin = tin;
        this.gender = gender;
        this.full_name = full_name;
        this.userId = user_id,
        this.company = company
        this.expiry = expiry;
        this.address = address;
        this.identificationProof = identificationProof;
        this.faceProof = faceProof;
        this.data = data;
        this.success = success;
        this.error = error;
        this.withImage = withImage;
        this.handler = handler;
        this.credequityProfile = credequityProfile;
        this.registration_number = registration_number;
        
    }

    getIDNumber()
    {
        return this.idNumber;
    }

    getCountry()
    {
        return this.country;
    }

    getCompany()
    {
        return this.company;
    }

    getRegistrationNumber()
    {
        return this.registration_number;
    }

    getFullName()
    {
        return this.full_name;
    }

    getIDType()
    {
        return this.idType;
    }

    getPin()
    {
        return this.pin;
    }

    getTin()
    {
        return this.tin;
    }

    getFirstName()
    {
        return this.firstName;
    }

    getMiddleName()
    {
        return this.middleName;
    }

    getLastName()
    {
        return this.lastName;
    }

    getGender()
    {
        return this.gender;
    }

    getAddress()
    {
        return this.address;
    }

    getExpiry()
    {
        return this.expiry;
    }

    getDOB()
    {
        return this.dob;
    }

    getIdentificationProof()
    {
        return this.identificationProof;
    }

    getFaceProof()
    {
        return this.faceProof;
    }

    setWithImage()
    {
        this.withImage=true;
    }

    isWithImage()
    {
        return this.withImage;
    }

    setCredequityProfile(nin, frscno, bvn)
    {
        this.credequityProfile = {'nin' : nin, 'frscno' : frscno, 'bvn' : bvn };
    }

    getCredequityProfile()
    {
        return this.credequityProfile;
    }

    /**
    * Returns user phone
    *
    * @return {string|null}
    */
    getPhoneNumber()
    {
        return this.phoneNumber;
    }

    /**
    * Returns the user id
    *
    * @return {string}
    */
    getUserId()
    {
        return this.userId;
    }
    /**
    * Sets success to true
    *
    * @return {void}
    */
    confirmSuccess()
    {
        this.success = true;
    }

    /**
    * Sets success to true
    *
    * @return {void}
    */
    confirmSuccess()
    {
        this.success = true;
    }

    /**
    * Sets the pipe that handled the request
    *
    * @param {string} handler
    * @return {void}
    */
    setHandler(handler)
    {
        this.handler = handler;
    }

    /**
    * Gets the pipe that handled the request
    *
    * @return {string}
    */
    getHandler()
    {
        return this.handler;
    }

    /**
    * Sets data returned from the request
    *
    * @param {object} data
    * @return {void}
    */
    setData(data = {})
    {
        this.data=data;
    }

    /**
    * Sets the error associated with request
    *
    * @param {object} error
    * @return {void}
    */
    setError(error = {})
    {
        this.error=error;
    }

    /**
    * Return error associated with request
    *
    * @return {string}
    */
    getError()
    {
        return this.error['error'];
    }

    /**
    * Returns the data gotten from the request
    *
    * @return {object}
    */
    getData()
    {
        return this.data;
    }

    /**
    * Checks if the request is successful
    *
    * @return {boolean}
    */
    isSuccessful()
    {
        return this.success;
    }

}

module.exports = IdFilter;