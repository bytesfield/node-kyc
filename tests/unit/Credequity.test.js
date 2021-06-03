const SabiCustomer = require('../../index');
const services = require('../../src/config/services');

describe("Credequity Test", () => {

    it("Should not verify NIN if First Name do not match", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "NIN",
            "first_name": "KAYODE",
            "last_name": "BABATUNDE",
            "date_of_birth": "24-11-1975",
            "phone_number": "1234567890"

        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.error).toEqual('Firstname does not match');
    }, 80000);

    it("Should not verify NIN if Date of birth do not match", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "NIN",
            "first_name": "CHUKWUEMEKA",
            "last_name": "BABATUNDE",
            "date_of_birth": "24-11-2020",
            "phone_number": "1234567890"
        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.error).toEqual('Date of birth does not match');
    }, 80000);

    it("Should verify NIN", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "NIN",
            "first_name": "CHUKWUEMEKA",
            "last_name": "BABATUNDE",
            "date_of_birth": "24-11-1975",
            "phone_number": "1234567890"

        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();
        
        expect(response.message).toEqual('NIN Verified Successfully');
        expect(response.handler).toEqual(services.credequity.client);
    }, 80000);

    it("Should not verify BVN if First Name do not match", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "BVN",
            "first_name": "James",
            "last_name": "Doe",
            "date_of_birth": "29-Aug-1988",
            "phone_number": "1234567890"

        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.error).toEqual('Firstname does not match');
    }, 80000);

    it("Should not verify BVN if Last Name do not match", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "BVN",
            "first_name": "John",
            "last_name": "Dave",
            "date_of_birth": "29-Aug-1988",
            "phone_number": "1234567890"

        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.error).toEqual('Lastname does not match');
    }, 80000);


    it("Should not verify BVN if Date of Birth do not match", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "BVN",
            "first_name": "John",
            "last_name": "Doe",
            "date_of_birth": "29-Aug-1980",
            "phone_number": "1234567890"

        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.error).toEqual('Date of birth does not match');
    }, 80000);

    it("Should verify BVN", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "BVN",
            "first_name": "John",
            "last_name": "Doe",
            "date_of_birth": "29-Aug-1988",
            "phone_number": "1234567890"

        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.message).toEqual('BVN Verified Successfully');
        expect(response.handler).toEqual(services.credequity.client);
    }, 80000);

    it("Should not verify DRIVERS_LICENSE if Date of Birth do not match", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "DRIVERS_LICENSE",
            "first_name": "CHUKWUEMEKA",
            "last_name": "Doe",
            "date_of_birth": "08-03-1993",
            "phone_number": "1234567890"

        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.error).toEqual('Date of birth does not match');
    }, 80000);

    it("Should verify DRIVERS_LICENSE", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "DRIVERS_LICENSE",
            "first_name": "CHUKWUEMEKA",
            "last_name": "Doe",
            "date_of_birth": "08-03-1992",
            "phone_number": "1234567890"

        }

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.message).toEqual('DRIVERS_LICENSE Verified Successfully');
        expect(response.handler).toEqual(services.credequity.client);
    }, 80000);

    it("Should not verify ID if payload is empty", async () => {

        const payload = {}

        const sabiCustomer = new SabiCustomer(payload);

        const response = await sabiCustomer.verifyID();

        expect(response.error).toEqual('Payload must not be empty');
    }, 80000);

});