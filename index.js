const express = require("express");
const path = require("path");
const { use } = require("express/lib/application");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
require("dotenv").config();

routes(app);
app.use(express.static(path.join(__dirname, "views")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
