class Billing {
    baseUrl = 'https://ziwo.freshdesk.com/api/v2/'

    constructor() {
        apiKey = process.env.ZIWO_BILLING_API_KEY
    }

    createCustomer(firstName, lastName, email, company) {
        return new Promise(function (resolve, reject) {
            try {
                resolve()
            } catch (err) {
                reject(err);
            }

        })
    }
}

module.exports = Billing