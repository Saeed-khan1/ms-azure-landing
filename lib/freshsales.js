class FreshSales {
    baseUrl = 'https://ziwo.freshsales.io/api/'
    apiKey = null

    constructor() {
        apiKey = process.env.ZIWO_FRESHSALES_API_KEY
    }

    async createCustomer(firstName, lastName, email, company) {
        return new Promise(function (resolve, reject) {
            try {
                const response = await fetch(`${baseUrl}sales_accounts`, {
                    method: 'post',
                    body: JSON.stringify({
                        "sales_account": {
                            "name": firstName + ' ' + lastName,
                            "email": email,
                            "company_name": company
                        }
                    }),
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization' : `Token token=${this.apiKey}` 
                    }
                });
                const data = await response.json();
                console.log("response", data);
                resolve()
            } catch (err) {
                reject(err);
            }

        })
    }
}

module.exports = FreshSales