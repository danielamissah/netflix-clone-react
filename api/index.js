const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

connectDB().catch(err => console.log(err)); 

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
    })
        .then(() => console.log("DB Connection Success"))
        .catch((err) => console.log(err));
}

app.listen(8800, () => {
    console.log("Backend Server is running");
});