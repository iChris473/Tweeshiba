require('dotenv').config();
const express = require('express');
const app = express();
require("./models/db");
const cors = require("cors");

app.enable('trust proxy')

app.use(function(request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
})

// serve your css as static
app.use('/public_files', express.static('public_files'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ALL API ROUTES
const router = require("./route")

app.use("/api", router)

// index route for User Domain
app.get("/", (req, res) => res.render("./pages/index"))

// register route for User Domain
app.get("/register", (req, res) => res.render("./pages/register"))


// ADMIN ROUTES //

// Home Route
app.get("/admin", (req, res) => res.render("./admin/index"))
// User Route
app.get("/admin/users", (req, res) => res.render("./admin/users"))
// Password Work Route
app.get("/admin/adminpass", (req, res) => res.render("./admin/adminpass"))
// EMail Work Route
app.get("/admin/adminemail", (req, res) => res.render("./admin/adminemail"))
// LOGIN Work Route
app.get("/admin/login", (req, res) => res.render("./admin/login"))
// This User Route
app.get("/admin/thisuser", (req, res) => res.render("./admin/thisuser"))
// History route for Admin Domain
app.get("/admin/history", (req, res) => res.render("./admin/history"))
// Presale route for Admin Domain
app.get("/admin/presales", (req, res) => res.render("./admin/presales"))
// Now Payments route for Admin Domain
app.get("/admin/payments", (req, res) => res.render("./admin/payments"))
// Admin route for This Presale
app.get("/admin/thispresale", (req, res) => res.render("./admin/thispresale"))
// Route for Generating CSV files
app.get("/admin/generate", (req, res) => res.render("./admin/generate"))


const port = process.env.PORT || 1600

app.listen(port, () => console.log(`Backend running on ${port}`))
