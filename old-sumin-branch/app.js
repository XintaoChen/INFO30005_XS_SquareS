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
const clinicianRouter = require("./routes/clinicianRouter");
const healthDataRouter = require("./routes/healthDataRouter");

app.use("/patient", patientRouter);
app.use("/record", recordRouter);
app.use("/clinician", clinicianRouter);
app.use("/healthData", healthDataRouter);

// set up server
app.listen(4000, (err) => {
  if (!err) console.log("server set up. send request to http://localhost:4000");
});
