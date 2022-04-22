const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./models/db");

// link to routes
const patientRouter = require("./routes/patientRouter");
const recordRouter = require("./routes/recordRouter");

app.use("/patient", patientRouter);
app.use("/record", recordRouter);
// set up server
app.listen(4000, (err) => {
  if (!err) console.log("server set up. send request to http://localhost:4000");
});
