const axios = require('axios');
require('dotenv').config()
class Billing {
    baseUrl = 'https://ziwo.freshdesk.com/api/v2/'
    apiKey= null
    billingUrl="http://localhost:1337"

    constructor() {
        this.apiKey = "Bearer " +  process.env.ZIWO_BILLING_API_KEY
    }

    createCustomer(company, email) {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = axios.create({
                    baseURL: this.billingUrl,
                    headers: {'Authorization': this.apiKey}
                  });
                const response = await instance.post('customers', {name: company, general_manager: email, clearbooks_id: "23"})
                console.log("\nResponse: \n:", response.data);
                resolve(response.data)
            } catch (err) {
                reject(err);
            }

        })
    } 
}

module.exports = Billing