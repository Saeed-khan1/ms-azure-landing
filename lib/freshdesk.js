class Freshdesk {
    baseUrl = 'https://ziwo.freshdesk.com/api/v2/'

    constructor() {
        apiKey = process.env.ZIWO_FRESHSALES_KEY
    }

    createCustomer(firstName, lastName, email, company) {
        return new Promise(function (resolve, reject) {
            try {
                const response = await fetch(`${baseUrl}account`, {
                    method: 'post',
                    body: JSON.stringify({
                        "name": firstName + ' ' + lastName,
                        "email": email,
                        "company_name": company
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token token=${this.apiKey}`
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

module.exports = Freshdesk