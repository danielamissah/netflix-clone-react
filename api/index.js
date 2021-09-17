const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

const dotenv = require("dotenv");
dotenv.config();


const port = 3001//process.env.PORT;
const connectionString = process.env.DB_CONNECTION_STRING;

 mongoose.connect('mongodb+srv://emmanuel:Emmanuel123@netflix-cluster.pxngm.mongodb.net/netflix?retryWrites=true&w=majority', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    })
        .then(() => console.log("DB Connection Success"))
    .catch((err) => console.log("Unable to connect to DB: " + err));
        
app.use(express.json())
app.use(authRoute);
app.use(userRoute);

app.listen(port, () => {
    console.log("Backend Server is running");
});