// Import express
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// Set your app up as an express app
const app = express();
app.use(express.static("./public/"));

// Set up to handle POST requests
app.use(express.json()); // needed if POST data is in JSON format
app.use(express.urlencoded()); // only needed for URL-encoded input

app.engine(
  "hbs",
  exphbs.engine({
    defaultlayout: "main",
    extname: "hbs",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials/",
    helpers: {
      section: function (name, block) {
        if (!this._sections) this._sections = {};
        this._sections[name] = block.fn(this);
        return null;
      },
    },
  })
);

const hbs = exphbs.create();
hbs.getPartials().then(function (partials) {
  console.log(partials);
});

app.set("/", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

// Tells the app to send the string: "Our demo app is working!" when you hit the '/' endpoint.
app.get("/", (req, res) => {
  res.render("aboutUs.hbs");
});

// link to our router

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req, res, next) => {
  console.log("message arrived: " + req.method + " " + req.path);
  next();
});

// the demo routes are added to the end of the '/demo-management' path

// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(process.env.PORT || 3000, () => {
  console.log("The library app is running!");
});
