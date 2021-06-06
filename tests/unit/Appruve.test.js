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

    it("Should verify NIN", async () => {

        const payload = {
            "id": "13478900911",
            "id_type": "NIN",
            "country": "NG",
            "first_name": "Clement",
            "last_name": "Okezie",
            "middle_name": "Nwoji",
            "date_of_birth": "1966-01-11",
            "phone" : "08000110004"
        }

        const response = await sabiCustomer.verifyID(payload, handler);

        expect(response.message).toEqual('NIN Verified Successfully');
        expect(response.handler).toEqual(services.appruve.client);

    }, 80000);

});