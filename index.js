const express = require('express')
const app = express()
const msal = require('@azure/msal-node');
const port = process.env.PORT || 3000

const config = {
  auth: {
    clientId: "7326c157-6b14-4bd9-8a76-856d27861bbe",
    authority: "https://login.microsoftonline.com/common",
    clientSecret: "L6n7Q~wRphjscUskU9_3GmKquI0w8TQsIi3zG"
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    }
  }
};

const cca = new msal.ConfidentialClientApplication(config);

app.get('/landing', (req, res) => {
  console.log("Request Token:", req.query.token)
  res.send('Sign up for your ziwo account!')
})

app.get('/', (req, res) => {
  console.log("Request Token:", req.query.token)

  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: `http://localhost:${port}/redirect`,
  };

  // get url to sign user in and consent to scopes needed for application
  cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
    res.redirect(response);
  }).catch((error) => console.log(JSON.stringify(error)));

  // res.send('Sign up for your ziwo account!')
})

app.get('/redirect', (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: `http://localhost:${port}/redirect`,
  };

  cca.acquireTokenByCode(tokenRequest).then((response) => {
    console.log("\nResponse: \n:", response);
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});

app.post('/notify', (req, res) => {
  res.send('Sign up for your ziwo account!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})