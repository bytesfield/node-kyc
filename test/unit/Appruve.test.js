const SabiCustomer = require('../../index');
const services = require('../../src/config/services');

const sabiCustomer = new SabiCustomer();
const handler = services.appruve.client.toUpperCase();

describe("Appruve Test", () => {

    it("Should not verify ID if payload is empty", async () => {

        const payload = {}

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.error).toEqual('Payload must not be empty');
    }, 80000);

    it("Should verify Nigerian NIN", async () => {

        const payload = {
            "id": "13478900911",
            "id_type": "NIN",
            "country": "NG",
            "first_name": "Clement",
            "last_name": "Nwoji",
            "middle_name": "Okezie",
            "date_of_birth": "1966-01-11",
            "phone" : "08000110004"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('NIN Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Nigerian PASSPORT", async () => {

        const payload = {
            "id": "A50013320",
            "id_type": "PASSPORT",
            "country": "NG",
            "first_name": "Sunday",
            "last_name": "Obafemi",
            "middle_name": "Clement",
            "date_of_birth": "1975-04-25",
            "phone" : "08000110004"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('PASSPORT Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Nigerian VOTER_CARD", async () => {

        const payload = {
            "id": "90F5B0407E2960502637",
            "id_type": "VOTER_CARD",
            "country": "NG",
            "first_name": "Nwabia",
            "last_name": "Chidozie",
            "middle_name": "Stanley",
            "date_of_birth": "1998-01-10"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('VOTER_CARD Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Nigerian DRIVERS_LICENSE", async () => {

        const payload = {
            "id": "ABC00578AA2",
            "id_type": "DRIVERS_LICENSE",
            "country": "NG",
            "first_name": "Henry",
            "last_name": "Nwandicne",
            "middle_name": "Emeka",
            "date_of_birth": "1976-04-15"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('DRIVERS_LICENSE Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Nigerian BVN", async () => {

        const payload = {
            "id": "22000000900",
            "id_type": "BVN",
            "country": "NG",
            "first_name": "Ayodele",
            "last_name": "Obasooto",
            "middle_name": "Femi",
            "date_of_birth": "1988-10-20"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('BVN Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Nigerian TIN", async () => {

        const payload = {
            "id": "00000000-0001",
            "id_type": "TIN",
            "country": "NG",
            "first_name": "Ayodele",
            "last_name": "Obasooto",
            "middle_name": "Femi",
            "date_of_birth": "1988-10-20"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('TIN Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Ghana VOTER_CARD", async () => {

        const payload = {
            "id": "2000100000",
            "id_type": "VOTER_CARD",
            "country": "GH",
            "first_name": "Elizabeth",
            "last_name": "Adjei",
            "date_of_birth": "1996-02-21"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('VOTER_CARD Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Ghana PASSPORT", async () => {

        const payload = {
            "id": "G0000000",
            "id_type": "PASSPORT",
            "country": "GH",
            "first_name": "Evans",
            "last_name": "Amankwah",
            "date_of_birth": "1986-04-05"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('PASSPORT Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should not verify Ghana SSNIT if Fullname does not match", async () => {

        const payload = {
            "id": "C000007000001",
            "id_type": "SSNIT",
            "country": "GH",
            "first_name": "Mike",
            "last_name": "John",
            "date_of_birth": "1986-04-05"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.error).toEqual('Fullname does not match');

    }, 80000);

    it("Should verify Ghana SSNIT", async () => {

        const payload = {
            "id": "C000007000001",
            "id_type": "SSNIT",
            "country": "GH",
            "first_name": "Michael",
            "last_name": "Essien",
            "date_of_birth": "1986-04-05"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('SSNIT Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should not verify Ghana DRIVERS_LICENSE if Fullname does not match", async () => {

        const payload = {
            "id": "G0000001",
            "id_type": "DRIVERS_LICENSE",
            "country": "GH",
            "first_name": "Mike",
            "last_name": "Davis",
            "date_of_birth": "1992-04-05"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.error).toEqual('Fullname does not match');

    }, 80000);

    it("Should not verify Ghana DRIVERS_LICENSE if date of birth does not match", async () => {

        const payload = {
            "id": "G0000001",
            "id_type": "DRIVERS_LICENSE",
            "country": "GH",
            "first_name": "Kwabena",
            "last_name": "Aikens",
            "date_of_birth": "2000-04-05"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.error).toEqual('Date of birth does not match');

    }, 80000);

    it("Should verify Ghana DRIVERS_LICENSE", async () => {

        const payload = {
            "id": "G0000001",
            "id_type": "DRIVERS_LICENSE",
            "country": "GH",
            "first_name": "Kwabena",
            "last_name": "Aikens",
            "date_of_birth": "1992-04-05"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('DRIVERS_LICENSE Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should not verify wrong Ghana TIN", async () => {

        const payload = {
            "tin": "C0000000002",
            "id_type": "TIN",
            "country": "GH",
            "first_name": "Kwabena",
            "last_name": "Aikens",
            "date_of_birth": "1992-04-05"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.error).toEqual('Unable to find taxpayer with TIN -  C0000000002');

    }, 80000);

    it("Should verify Kenya NATIONAL_ID", async () => {

        const payload = {
            "id": "00000001",
            "id_type": "NATIONAL_ID",
            "country": "KE",
            "first_name": "Fiona",
            "last_name": "Nyawera",
            "date_of_birth": "1986-05-13"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('NATIONAL_ID Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Kenya PASSPORT", async () => {

        const payload = {
            "id": "A0000003",
            "id_type": "PASSPORT",
            "country": "KE",
            "first_name": "Fiona",
            "last_name": "Nyawera",
            "date_of_birth": "1981-02-14"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('PASSPORT Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Kenya KRA", async () => {

        const payload = {
            "pin": "A000000010",
            "id_type": "KRA",
            "country": "KE",
            "first_name": "Fiona",
            "last_name": "Nyawera",
            "date_of_birth": "1981-02-14"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('KRA Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

    it("Should verify Uganda wrong phone TELCO_SUBSCRIBER", async () => {

        const payload = {
            "phone_number": "+256000000001",
            "id_type": "TELCO_SUBSCRIBER",
            "country": "UG",
            "first_name": "Christopher",
            "last_name": "Kalule"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('Validation Failed');

    }, 80000);

});