const SabiCustomer = require('../../index');
const services = require('../../src/config/services');

const sabiCustomer = new SabiCustomer();
const handler = services.smile.client.toUpperCase();

describe("Credequity Test", () => {

    it("Should not verify ID if payload is empty", async () => {

        const payload = {}

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.error).toEqual('Payload must not be empty');
    }, 80000);

    it("Should not verify ID if id number is not provided", async () => {

        const payload = {
            "id_type": "BVN",
            "country": "NG",
            "first_name": "KAYODE",
            "last_name": "BABATUNDE",
            "user_id" : "123",

        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.error).toEqual('id_number is required');
        expect(response.code).toEqual('2413');

    }, 80000);

    it("Should not verify ID if user id is not provided", async () => {

        const payload = {
            "id": "00000000000",
            "country": "NG",
            "id_type": "BVN",
            "first_name": "KAYODE",
            "last_name": "BABATUNDE",
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.error).toEqual('user_id must be a string.');
        expect(response.code).toEqual('2413');

    }, 80000);

    it("Should verify ID", async () => {

        const payload = {
            "id": "00000000000",
            "id_type": "NIN",
            "country": "NG",
            "first_name": "CHUKWUEMEKA",
            "last_name": "Nyawera",
            "middle_name": "Clement",
            "date_of_birth": "24-11-1975",
            "user_id" : "123"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.code).toEqual('2401')

    }, 80000);

});