const msal = require("@azure/msal-node");
const path = require("path");
const Billing = require("../lib/billing");
const port = process.env.PORT || 3000;
const config = {
  auth: {
    clientId: "7326c157-6b14-4bd9-8a76-856d27861bbe",
    authority: "https://login.microsoftonline.com/common",
    clientSecret: "L6n7Q~wRphjscUskU9_3GmKquI0w8TQsIi3zG",
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

class MsController {
  cca = null;
  billing = new Billing();
  constructor() {
    this.cca = new msal.ConfidentialClientApplication(config);
  }

  adLogin(req, res) {
    console.log("Request Token:", req.query.token);

    const authCodeUrlParameters = {
      scopes: ["user.read"],
      redirectUri: `http://localhost:${port}/redirect`,
    };

    // get url to sign user in and consent to scopes needed for application
    this.cca
      .getAuthCodeUrl(authCodeUrlParameters)
      .then((response) => {
        res.redirect(response);
      })
      .catch((error) => console.log(JSON.stringify(error)));
  }

  callback(req, res) {
    const tokenRequest = {
      code: req.query.code,
      scopes: ["user.read"],
      redirectUri: `http://localhost:${port}/redirect`,
    };

    this.cca
      .acquireTokenByCode(tokenRequest)
      .then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendFile(path.resolve("./views/complete.html"));
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  }

  async saveToBilling(req, res) {
    if (req.body) {
      await this.billing.createCustomer(req.body.company, req.body.email);
      res.sendFile(path.resolve("./views/success.html"));
    } else res.send({ status: "bad request" });
  }

  landing(req, res) {
    console.log("Request Token:", req.query.token);
    res.sendFile(path.resolve("./views/landing.html"));
  }

  contactDetails(req, res) {
    console.log("Request Token:", req.query.token);
    res.sendFile(path.resolve("./views/contactDetails.html"));
  }

  notify(req, res) {
    res.send("Sign up for your ziwo account!");
  }
}

module.exports = MsController;
