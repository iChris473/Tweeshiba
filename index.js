
require('dotenv').config();
const express = require('express');
const app = express();

// app.enable('trust proxy')

// app.use(function(request, response, next) {

//     if (process.env.NODE_ENV != 'development' && !request.secure) {
//        return response.redirect("https://" + request.headers.host + request.url);
//     }

//     next();
// })

// serve your css as static
app.use('/public_files', express.static('public_files'));

// index route for User Domain
app.get("/", (req, res) => res.sendFile(__dirname + "/public.html"))


const port = process.env.PORT || 1400

app.listen(port, () => console.log(`Backend running on ${port}`))