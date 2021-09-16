const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

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
        
app.use(express.json())
app.use("/api/routes/auth", authRoute);
app.use("/api/routes/users", userRoute);

app.listen(port, () => {
    console.log("Backend Server is running");
});