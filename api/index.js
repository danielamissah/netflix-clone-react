const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();


const port = process.env.PORT;
const connectionString = process.env.DB_CONNECTION_STRING;

 mongoose.connect(connectionString, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    })
        .then(() => console.log("DB Connection Success"))
        .catch((err) => console.log("Unable to connect to DB: " + err));

app.listen(port, () => {
    console.log("Backend Server is running");
});